import express from "express";
import ProductController from "../../controllers/productController.js";

const routerProduct = express.Router();

routerProduct.get('/products-page', (req, res) =>{
    res.render('product/products-page');
});

routerProduct.get('/product-details', (req, res) =>{
    res.render('product/product-details');
});

routerProduct.get('/add-product', (req, res) =>{
    res.render('product/product-add');
});
routerProduct.post('/add-product', (req, res) =>{
    ProductController.addProduct(req, res);
});

routerProduct.get('/delete-product/:id', (req, res) =>{
    console.log('oi')
    console.log(req.params.id)
    ProductController.removeProduct(req, res);
    
})

export default routerProduct;