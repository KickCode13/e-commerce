import mongoose from "mongoose";
import Product_Model from "../models/Product_Model.js";


class ProductController{
    static async addProduct(req, res){
       const {name, price, quantity, description} = req.body;
       console.log(name, price, quantity, description);
       const newProduct = new Product_Model({
        name, price, quantity, description
       })
       await newProduct.save();
    }
}

export default ProductController;