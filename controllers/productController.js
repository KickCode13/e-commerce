import Product_Model from "../models/Product_Model.js";

class ProductController {
  static async addProduct(req, res) {
    try {
      const { name, price, quantity, description } = req.body;
      
      console.log(name, price, quantity, description);
      const newProduct = new Product_Model({
        name,
        price,
        quantity,
        description,
      });
      await newProduct
        .save()
        .then((product) => {
          if (product) {
            console.log(product);
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


}

export default ProductController;
