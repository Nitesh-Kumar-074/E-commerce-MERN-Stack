import express from 'express'
import {createItem,updateQuantityOfItem,deleteItem,getItemById,existedCartItem,getAllItemsOfUser} from '../controllers/cartItem.controller.js'
import {verifyJwt} from '../middlewares/auth.middleware.js'
 

const router = express.Router()
router.route("/createItem").post(verifyJwt,createItem)
router.route("/updateQuantityOfItem/:cartItemId").patch(verifyJwt,updateQuantityOfItem)
router.route("/deleteItem/:cartItemId").delete(verifyJwt,deleteItem) 
router.route("/getItemById/:cartItemId").get(verifyJwt,getItemById) 
router.route("/existedCartItem/:productId/:size").get(verifyJwt,existedCartItem)
router.route("/getAllItemsOfUser").get(verifyJwt,getAllItemsOfUser)

export default router    