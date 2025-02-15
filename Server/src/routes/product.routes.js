import express,{Router} from 'express'
import {getProductById,createProduct,updateProduct,getProducts,createProductWithoutCloudinary,paginatedProducts} from '../controllers/product.controller.js'
import {verifyJwt} from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/createProduct').post(verifyJwt,createProduct)
router.route('/getProductById/:productId').get(getProductById) 
router.route('/updateProduct/:productId').patch(updateProduct)
router.route('/getProducts/:firstLevelCategory/:secondLevelCategory').get(getProducts)
router.route('/createProductWithoutCloudinary').post(verifyJwt,createProductWithoutCloudinary)
router.route('/paginatedProducts/:firstLevelCategory/:secondLevelCategory/:color/:page').get(paginatedProducts)
export default router  