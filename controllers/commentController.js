import commentModel from "../models/Comment_Model.js";
import mongoose from "mongoose";
import userGetStatusLogin from "../utils/userGetStatusLogin.js";
class Comment_Controller {
  static async toComment(req, res) {
    const comment = req.body.comment;
    const productID = req.body.productID;
    console.log("ProductID",productID);
    console.log("Comentario:", comment, "\nDados do usuario", req.user, "\n");
    const newComment = new commentModel({
      contentText: comment,
      User: req.user.id, //forma atualizada
      Product: productID,
    });
    const savedComment = await newComment.save();
    console.log(savedComment);
    res.status(201).json(savedComment);
  }
  static async getAllComments(req, res) {
    const id = req.params.id;
    const commentAll = commentModel.findById(id);
    console.log(commentAll);
  }
}

export default Comment_Controller;
