import dotenv from 'dotenv'
dotenv.config({path : './.env'})

import {app} from './app.js'
import { connectDB } from './src/db/index.js'
import {v2 as cloudinary} from 'cloudinary'

const port = process.env.PORT


connectDB().then(() => {
       app.listen(port,() => {
              console.log("Mr. Nitesh, your server is connected to database successfully")
       })
       
}).catch((err) => {
       console.log("Mongodb connection failed ",err)
})

cloudinary.config({
       cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
       api_key: process.env.CLOUDINARY_API_KEY, 
       api_secret: process.env.CLOUDINARY_API_SECRET 
})