import e from "express";
import userAuthenticationJWT from "../../middlewares/userAuthenticationJWT.js";
import productModel from "../../models/Product_Model.js";
import Cart_Controller from "../../controllers/cartController.js";
const routerCart = e.Router();


routerCart.post("/cart-items/:id", userAuthenticationJWT, (req, res) => {
  Cart_Controller.addToCart(req, res);

});

routerCart.delete('/cart-delete/:id', userAuthenticationJWT, (req, res) =>{
  Cart_Controller.removeProductCart(req, res);
})
routerCart.get("/cart-items", userAuthenticationJWT, (req, res) => {
 
  Cart_Controller.seeMyCart(req, res);
});
routerCart.post("/cart-send", userAuthenticationJWT, (req, res) => {
 
  Cart_Controller.finalizarCarrinho(req, res);
});

export default routerCart;
