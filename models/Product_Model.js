import mongoose, { Schema } from "mongoose";

const productModel = mongoose.model(
  "Product",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    category:{
      type:String,
      default:"Meias"
    },
    sizeOption:{
      type:String,
      default:"P"
    },
    colorOption:{
      type:String,
      default:"Cor"
    },productFeatures:{
      type:String,
      default:"Kick"
    },
    price: {
      type: String,
      required: true,
    },
    stockQuantity:{
      type: Number,
      default: 0
    },
    description: {
      type: String,
      required: true,
    },
    image_url:{
      type: String,
      required:true
    },
    purchased: {
      type: Boolean,
      default: false,
    },
    purchaseDate: {
      type: Date,
      default: null,
    },
    buyer: {
      name: {
        type: String,
        default: null, // Optional, can be null if no buyer yet
      },
      email: {
        type: String,
        default: null, // Optional
      },
    },
    productStatus: {
      type: String,
      enum: ["In stock", "Out of stock"], // Limits the status to these values
      default: "In stock", // Default status
    },
    shippingStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending", // Default to pending shipping status
    },
  })
);

export default productModel;
