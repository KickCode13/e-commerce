import mongoose, { Schema } from "mongoose";

const cartModel = mongoose.model(
  "Cart",
  new Schema({
    Product: {  // Novo campo para associar o comentário ao produto
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",  // Referência ao modelo Product
      // Garantir que todo comentário tenha um produto associado
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    quantity: {
      type: Number,
      default: 0
      // Não permite quantidade negativa
    },
  })
);

export default cartModel;
