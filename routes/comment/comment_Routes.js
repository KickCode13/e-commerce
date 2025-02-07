import express from "express";
import Comment_Controller from "../../controllers/commentController.js";
const commentRouter = express.Router();
import userAuthenticationJWT from '../../middlewares/userAuthenticationJWT.js'

commentRouter.post("/review-comment/:id", userAuthenticationJWT, (req, res)=>{
    Comment_Controller.toComment(req, res);
});

export default commentRouter;