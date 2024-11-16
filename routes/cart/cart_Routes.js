import e from "express";

const routerCart = e.Router();

routerCart.get('/cart-items', (req, res) =>{
    res.render('cart/shoppingCart');
});

export default routerCart;