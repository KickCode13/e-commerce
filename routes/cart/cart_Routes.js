import e from "express";
import userAuthenticationJWT from "../../middlewares/userAuthenticationJWT.js";
const routerCart = e.Router();

routerCart.get("/cart-items", userAuthenticationJWT, (req, res) => {
  res.render("cart/shoppingCart");
});

export default routerCart;
