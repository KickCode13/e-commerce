import e from "express";
const routerProduct = e.Router();

routerProduct.get('/products-page', (req, res) =>{
    res.render('product/products-page');
});

routerProduct.get('/product-details', (req, res) =>{
    res.render('product/product-details');
});

export default routerProduct;