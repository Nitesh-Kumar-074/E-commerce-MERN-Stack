import express from 'express'
import {createOrder} from '../controllers/order.controller.js'
import {verifyJwt} from '../middlewares/auth.middleware.js'


const router = express.Router()
router.route('/createOrder').post(verifyJwt,createOrder)


export default router 