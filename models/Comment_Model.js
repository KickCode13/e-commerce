import mongoose, { Schema } from "mongoose";

const commentModel = mongoose.model(
  "Comment",
  new Schema({
    contentText: {
      type: String,
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    Product: {  // Novo campo para associar o comentário ao produto
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",  // Referência ao modelo Product
      // Garantir que todo comentário tenha um produto associado
    },
  })
);

export default commentModel;
