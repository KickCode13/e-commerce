import e from "express";
import ProductController from "../../controllers/productController.js";

const routerProduct = e.Router();

routerProduct.get('/products-page', (req, res) =>{
    res.render('product/products-page');
});

routerProduct.get('/product-details', (req, res) =>{
    res.render('product/product-details');
});

routerProduct.post('/add-product', (req, res) =>{
    ProductController.addProduct(req, res);
});

export default routerProduct;