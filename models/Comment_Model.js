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
    }
  })
);

export default commentModel;
