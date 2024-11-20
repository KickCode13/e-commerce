import mongoose, { Schema } from "mongoose";

const productSchema = mongoose.model(
  "Product",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

export default productSchema;
