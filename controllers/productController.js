import Product_Model from "../models/Product_Model.js";

class ProductController {
  static async addProduct(req, res) {
    try {
      const { name, price, quantity, description, image_url } = req.body;
      
      console.log(name, price, quantity, description, image_url);
      const newProduct = new Product_Model({
        name,
        price,
        quantity,
        description,
        image_url,
      });
      await newProduct
        .save()
        .then((product) => {
          if (product) {
            console.log(product._id.toHexString());
            res.status(200).json({ message:"Adição de produto concluida"})
          }
        })
        .catch((err) => {
          console.log("Houve um erro");
        });
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllProducts(req, res){
    try {
        await Product_Model.find().
        then((products)=>{
            res.render('home/index', {products});
        });
    } catch (err) {
        
    }
  }

  static async removeProduct(req, res){
    const id = req.params.id;
    console.log(id);
    try {
      await Product_Model.findByIdAndDelete(id).
      then(deletedProduct =>{
        if(!deletedProduct){
          res.status(404).json({message:"Produto não encontrado"})
        }
        else{
          res.status(200).json({message:"Produto excluido com sucesso"});
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async getProduct(req,res){
    const id = req.params.id;
    try {
      const product = await Product_Model.findById(id);
      res.render('product/product-details', {product});
    } catch (err) {
      
    }
  }

}

export default ProductController;
