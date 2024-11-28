import express from "express";
import ProductController from "../../controllers/productController.js";

const routerProduct = express.Router();

routerProduct.get('/products-page', (req, res) =>{
    res.render('product/products-page');
});

routerProduct.get('/product-details/:id', (req, res) =>{
    ProductController.getProduct(req, res);
});

routerProduct.get('/add-product', (req, res) =>{
    res.render('product/product-add');
});
routerProduct.post('/add-product', (req, res) =>{
    ProductController.addProduct(req, res);
});

routerProduct.delete('/delete-product/:id', (req, res) =>{
    console.log('oi')
    console.log(req.params.id)
    ProductController.removeProduct(req, res);
    
})

export default routerProduct;