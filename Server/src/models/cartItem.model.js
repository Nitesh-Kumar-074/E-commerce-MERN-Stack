import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
       product : {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'Product'
       }, 
       quantity : {
              type : Number,
              required : true,
              default : 1
       },
       size : {
              type : String,
              required : true
       },
       user : {
              type : mongoose.Schema.Types.ObjectId,
              ref : 'User'
       }
})

const CartItem = mongoose.model("CartItem",cartItemSchema)

export {CartItem}