import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({ 
       origin : process.env.CORS_ORIGIN
}))
app.use(express.json()) 
app.use(cookieParser())
app.use(urlencoded({extended:true}))

app.use((err,req,res,next) => {
       console.error("Unhandled server error:", err);
       res.status(500).json({
       success: false,
       message: "An unexpected error occurred on the server.",
       });
})


import userRouter from './src/routes/user.routes.js'
app.use('/shopping/auth',userRouter)

import wishlistRouter from './src/routes/wishlist.routes.js'
app.use('/shopping/wishlist',wishlistRouter)

import cartRouter from './src/routes/cart.routes.js'
app.use('/shopping/cart',cartRouter)

import productRouter from './src/routes/product.routes.js'
app.use('/shopping/product',productRouter)

import orderRouter from './src/routes/order.routes.js'
app.use('/shopping/order',orderRouter)



app.get("/",(req,res) => {
       res.status(200).json("Welcome to backend you won't get anything here...")
})



export {app}