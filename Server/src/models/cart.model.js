import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cartItems: [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'CartItem'
    },
  ],
},{timestamps:true});

const Cart = mongoose.model("Cart",cartSchema)

export {Cart}