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
    
});

routerProduct.get('/edit-product/:id', (req, res)=>{
    ProductController.getEditProduct(req, res);

});

routerProduct.put('/edit-product/:id', (req, res)=>{
    console.log(req.body);
    ProductController.editProduct(req, res);

});

routerProduct.post("/checkout", async (req, res) => {
   ProductController.checkoutProduct(req, res);
});

routerProduct.get('/complete', (req, res)=>{

   ProductController.success_Url(req, res);
});
routerProduct.get('/adm/acess', (req, res) =>{
    ProductController.admAcessPage(req,res)
})
export default routerProduct;