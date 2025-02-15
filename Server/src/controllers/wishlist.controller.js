import { Wishlist } from '../models/wishlistItem.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const addToWishlist = async (req, res) => {
       try {
              const { productId } = req.params
              if (!req.user?._id) {
                     return res.status(404).json(new ApiResponse(false, 404, "Not found user id in token"))
              }
              const item = await Wishlist.create({
                     user: req.user._id,
                     product: productId
              })
              return res.status(201).json(new ApiResponse(true, 201, "Added to wishlist successfully", item))
       } catch (error) {
              console.error(error)
              return res.status(500).json("Can't add product in wishlist")
       }
}

const removeFromWishlist = async (req, res) => {
       try {
              const { productId } = req.params
              if (!req.user?._id) {
                     return res.status(404).json(new ApiResponse(false, 404, "Not found user id in token"))
              }
              const item = await Wishlist.findOneAndDelete({
                     user: req.user._id,
                     product: productId
              })
              return res.status(200).json(new ApiResponse(true, 200, "Removed from wishlist successfully", item))
       } catch (error) {
              console.error(error)
              return res.status(500).json( "Can't remove product from wishlist")
       }
}
const alreadyInWishList = async (req, res) => {
       try {
              const { productId } = req.params
              if (!req.user?._id) {
                     return res.status(404).json(new ApiResponse(false, 404, "Not found user id in token"))
              }
              const item = await Wishlist.findOne({ user: req.user._id, product: productId })
              if (!item) {
                     return res.status(200).json(new ApiResponse(true, 2000, "Item is not present in wishlist", false))
              }
              else {
                     return res.status(200).json(new ApiResponse(true, 200, "Item is in wishlist", item))
              }
       } catch (error) {
              return res.status(500).json("Can't find whether item is in wishlist or not")
       }
}

const getAllWishlistItems = async(req,res) => {
       try {
              const userId = req?.user?._id
              if(!userId){
                     return res.status(404).json(new ApiResponse(false,404,"User cookies unavailable"))
              }
              const items = await Wishlist.find({user : userId})?.populate("product")
              return res.status(200).json(new ApiResponse(true,200,"Wishlist items fetched successfully",items))
       } catch (error) {
              console.error(error)
              return res.status(500).json("Error in getAllWishlistItems in controller")
       }
}

export { addToWishlist, removeFromWishlist, alreadyInWishList, getAllWishlistItems }
