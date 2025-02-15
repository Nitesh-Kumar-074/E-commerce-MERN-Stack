import express from 'express'
import {addToWishlist,removeFromWishlist,alreadyInWishList,getAllWishlistItems} from '../controllers/wishlist.controller.js'
import {verifyJwt} from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route("/addToWishList/:productId").post(verifyJwt,addToWishlist)
router.route("/removeFromWishlist/:productId").delete(verifyJwt,removeFromWishlist)
router.route("/alreadyInWishList/:productId").get(verifyJwt,alreadyInWishList)
router.route("/getAllWishlistItems").get(verifyJwt,getAllWishlistItems)
export default router