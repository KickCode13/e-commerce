import e from "express";
import userAuthenticationJWT from "../../middlewares/userAuthenticationJWT.js";
const routerCart = e.Router();

import userGetStatusLogin from '../../utils/userGetStatusLogin.js';
routerCart.get("/cart-items", userAuthenticationJWT, (req, res) => {
  res.render("cart/shoppingCart", {user: userGetStatusLogin(req,res)});
});

export default routerCart;
