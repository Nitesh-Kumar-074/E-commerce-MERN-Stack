import {CartItem} from '../models/cartItem.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import {Cart} from '../models/cart.model.js'
import { User } from '../models/user.model.js'

const createItem = async(req,res) => {
       try {
              
              const {quantity,size,productId} = req.body

              if(!productId)
                     return res.status(404).send(new ApiResponse(false,404,"productId is missing in body"))
              if(!req.user){
                     return res.status(404).send(new ApiResponse(false,404,"cookie is missing "))  
              }  
              const cartItem = await CartItem.create({
                     product : productId,
                     user : req.user._id,
                     quantity,
                     size : size || "Not applicable"
              })
              const cart = await Cart.findById(req.user.cart)
              const items = cart.cartItems;
              const newItems = [...items,cartItem._id]
              await Cart.findByIdAndUpdate(req.user.cart,{cartItems : newItems},{new : true})
              const cartItemResponse = await CartItem.findById(cartItem._id).populate("product")
              return res.status(201).send(new ApiResponse(true,201,"Item added to cart",cartItemResponse))
       } catch (error) {
              console.error(error)
            return res.status(500).send("Error in creating cartItem")  
       }
}

const updateQuantityOfItem = async(req,res) =>{
       try {
              const {cartItemId} = req.params
              const {quantity} = req.body
              const updatedCartItem = await CartItem.findByIdAndUpdate(
                     cartItemId,
                     {quantity},
                     {new : true}
              )
              return res.status(200).json(new ApiResponse(true,200,"Cart-item updated successfully.",updatedCartItem))
       } catch (error) {
              console.error(error)
              return res.status(500).send("Error in updating cartItem")
       }
}

const deleteItem = async(req,res) => {
       try {
              const {cartItemId} = req.params
              if(!cartItemId){
                     return res.status(404).json(new ApiResponse(false,404,"cartItemId didn't found"))
              }
              const cart = await Cart.findById(req.user.cart)
              const itemsInCart = cart.cartItems
              const newItems = itemsInCart.filter((item) => item !== cartItemId)
              await Cart.findByIdAndUpdate(req.user.cart,{cartItems : newItems},{new : true})
              const deletedItem = await CartItem.findByIdAndDelete(cartItemId)
              if(!deletedItem){
                     return res.status(500).json(new ApiResponse(false,500,"Unable to delete item"))
              }
              return res.status(200).json(new ApiResponse(true,200,"Item deleted successfully",deleteItem))
       } catch (error) {
              console.error(error)
              return res.status(500).send("Error in deleting cartItem") 

       }
}

const getItemById = async(req,res) => {
       try {
              const {cartItemId} = req.params
              if(!cartItemId){
                     return res.status(404).json(new ApiResponse(false,404,"cartItemId didn't found"))
              }
              const item = await CartItem.findById(cartItemId).populate("product")
              if(!item){
                     return res.status(500).json(new ApiResponse(false,500,"Can't find item "))
              }
              return res.status(200).json(new ApiResponse(true,200,"Item fetched sucessfully",item))
       } catch (error) {
              console.error(error)
              return res.status(500).send("Error in fetching cartItem")
       }
}

const existedCartItem = async(req,res) => {
       try {
              const {productId,size} = req.params
              const userId = req?.user?._id
              if(!userId){
                     return res.status(404).send(new ApiResponse(false,404,"Cookie not found while checking that cartItem already exist or not"))    
              }
              const existedCartItem = await CartItem.findOne({product : productId,size,user:userId})
              if(existedCartItem){
                     return res.status(200).json(new ApiResponse(true,200,"Yes cart item already exist",existedCartItem))
              }
              else{
                     return res.status(200).json(new ApiResponse(true,200,"No cart item don't exist",false))
              }
       } catch (error) {
              console.error(error)
              return res.status(500).send("Error in fetching cartItem")
       }
}

const getAllItemsOfUser = async (req, res) => {
       try {
         const cartId = req?.user?.cart;
     
         if (!cartId) {
           return res.status(404).json("Cart ID not found in user object");
         }
     
         // Populate cartItems and within them, populate product
         const cartOfUser = await Cart.findById(cartId)
           .populate({
             path: "cartItems",
             populate: {
               path: "product", // Nested populate
               model: "Product", // Ensure it matches the model name
             },
           });
     
         if (!cartOfUser) {
           return res.status(404).json("Cart not found");
         }
     
         return res
           .status(200)
           .json({ success: true, message: "Cart items fetched successfully", data: cartOfUser });
       } catch (error) {
         console.error(error);
         return res.status(500).send("Error in getAllItemsOfUser controller");
       }
     };
     

export {createItem,updateQuantityOfItem,deleteItem,getItemById,existedCartItem,getAllItemsOfUser}