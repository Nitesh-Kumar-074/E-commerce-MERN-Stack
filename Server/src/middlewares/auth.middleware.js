import {User} from '../models/user.model.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import jwt from 'jsonwebtoken'

const verifyJwt = async(req,res,next) => {
       try {
              const token = req.cookies.accessToken || req.header("Authorization")?.split(" ")[1]
              const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
              const user = await User.findById(decodedToken._id).select("-password -refreshToken")
              if(!user){
                     return res.status(404).json(new ApiResponse(false,404,"Token is not valid"))
              }
              req.user = user
              next()
       } catch (error) {
              throw new ApiResponse(false,503,"Caaught error in verifyJwt function")
       }
}

export {verifyJwt}