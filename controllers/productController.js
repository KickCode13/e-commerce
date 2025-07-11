import Product_Model from "../models/Product_Model.js";

import Stripe from "stripe";
import userGetStatusLogin from "../utils/userGetStatusLogin.js";
import commentModel from "../models/Comment_Model.js";

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);
import mongoose from "mongoose";
import cartModel from "../models/Cart_Model.js";
class ProductController {
  static async addProduct(req, res) {
    try {
      const { name, price, quantity, description, image_url } = req.body;

      console.log(name, price, quantity, description, image_url);
      const newProduct = new Product_Model({
        name,
        price,
        stockQuantity:quantity,
        description,
        image_url,
      });
      await newProduct
        .save()
        .then((product) => {
          if (product) {
            console.log(product._id.toHexString());
            res.redirect("/product/adm/acess").status(200);
          }
        })
        .catch((err) => {
          console.log("Houve um erro", err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllProducts(req, res) {
    try {
     
      await Product_Model.find().then((products) => {
        res.render("home/index", { products, user: userGetStatusLogin});
      });
    } catch (err) {}
  }

 static async removeProduct(req, res) {
  const id = req.params.id;
  console.log(id);
  try {
    const deletedProduct = await Product_Model.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    // Remoção em cascata
    await cartModel.deleteMany({ Product: id });

    return res.status(200).json({ message: "Produto e itens no carrinho removidos com sucesso" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro interno ao deletar produto" });
  }
  }

  static async getProduct(req, res) {
    const id = req.params.id;
    const userId = req.user.id;
    console.log(typeof(id))
    try {
      const commentAll = await commentModel.find({ Product: id }).populate("User");
      console.log("commentAll = ",commentAll);
      const product = await Product_Model.findById(id);
      res.render("product/product-details", {
        product,
        user: userGetStatusLogin,
        commentAll
      });
    } catch (err) {
      console.log(err)
    }
  }

  static async getEditProduct(req, res) {
    const id = req.params.id;
    try {
      const product = await Product_Model.findById(id);
      res.render("product/product-edit", { product, user: userGetStatusLogin });
    } catch (err) {}
  }
  static async editProduct(req, res) {
    const id = req.params.id;
    const {
      name,
      category,
      sizeOption,
      colorOption,
      productFeatures,
      price,
      quantity,
      description,
      image_url,
      purchased,
      purchaseDate,
      buyer,
      productStatus,
      shippingStatus,
    } = req.body;

    try {
      await Product_Model.findByIdAndUpdate(id, {
        name,
        category,
        sizeOption,
        colorOption,
        productFeatures,
        price,
        quantity,
        description,
        image_url,
        purchased,
        purchaseDate,
        buyer,
        productStatus,
        shippingStatus,
      });
      res.status(200).json({ message: "Produto atualizado" });
    } catch (error) {}
  }
  static async checkoutProduct(req, res) {
    const { name, price, quantity } = req.body;
    console.log("Valores recebidos no corpo da requisição:");
    console.log("Nome:", name);
    console.log("Preço (como string):", price);
    console.log("Quantidade (como string):", quantity);

    // Parsing
    const parsedPrice = Math.round(parseFloat(price) * 100); // Converte preço para centavos
    const parsedQuantity = parseInt(quantity, 10); // Converte quantidade para inteiro

    // Logs após o parsing
    console.log("Valores após parsing:");
    console.log("Preço (em centavos):", parsedPrice);
    console.log("Quantidade (como inteiro):", parsedQuantity);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: name,
            },
            unit_amount: parsedPrice,
          },
          quantity: parsedQuantity,
        },
      ],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "BR"],
      },
      success_url: `${process.env.BASE_URL}/product/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });
    res.redirect(session.url);
  }

  static async addToCart(req, res){
    const userID = req.user.id;
    const productID = req.params.id;
  }
  static async success_Url(req, res) {
    const id = req.query.session_id;
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["payment_intent.payment_method"],
    });
    const lineItems = await stripe.checkout.sessions.listLineItems(id);
    console.log("Dados da compra:",lineItems);
    res.render("checkout/success", {
      lineItems: lineItems.data,
      user: userGetStatusLogin,
    });
  }
  static async admAcessPage(req, res) {
    try {
      await Product_Model.find().then((products) => {
        res.render("adm/index", { products, user: userGetStatusLogin });
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async getPageProducts(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 6; // produtos por página
      const skip = (page - 1) * limit;

      const products = await Product_Model.find().skip(skip).limit(limit);
      const totalProducts = await Product_Model.countDocuments();
      const totalPages = Math.ceil(totalProducts / limit);

      res.render('product/products-page', {
          products,
          currentPage: page,
          totalPages,
          user: userGetStatusLogin,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Erro ao buscar produtos");
    }
    

    
  }
}

export default ProductController;
