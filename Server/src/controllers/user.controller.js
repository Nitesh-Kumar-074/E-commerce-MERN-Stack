import {User} from '../models/user.model.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {Cart} from '../models/cart.model.js'

const registerUser = async(req,res) => {
       try {
              const {name,email,password,role,address} = req.body
              if([name,email,password].some((ele) => ele.trim() === '')){
                     return res.status(404).json(new ApiResponse(false,404,"Name email and password are compulsory while signup"))
              }

              const existedUser = await User.findOne({email})
              if(existedUser)
                     return res.status(403).json(new ApiResponse(false,403,"email already exists"))
              const createdCart = await Cart.create({})
              const user = await User.create({
                     name,
                     email,
                     password,
                     role,
                     address,
                     cart : createdCart._id
              })
              if(!user){
                     return res.status(500).json(new ApiResponse(false,500,"Ann error occured while creating user in backend"))
              }
              const createdUser = await User.findById(user._id).select("-password -address")
              if(!createdUser)
                     return res.status(500).json(new ApiResponse(false,500,"An error occured while fetching user from backend"))

              return res.status(201).json(new ApiResponse(true,201,"User registered successfully ",createdUser))
       } catch (error) {
              console.error("Error in register in user.controller ",error)
              return res.status(500).json("Caught error in registerUser function ")
       }
}

const generateAccessAndRefreshToken = async(userId) => {
       try {
              const user = await User.findById(userId)
              const accessToken = user.generateAccessToken()
              const refreshToken = user.generateRefreshToken()
              user.refreshToken = refreshToken
              await user.save({validateBeforeSave : false})
              return {accessToken,refreshToken}
       } catch (error) {
              console.error(error)
              return res.status(500).json("Caught error in generateAccessAndRefreshToken function ")
       }
}

const loginUser = async(req,res) => {
       try {
              const {email,password} = req.body
              if(!email || !password){
                     return res.status(404).json(new ApiResponse(false,404,"Both email and password is required"))
              }
              const user = await User.findOne({email})
       
              if(!user){
                     return res.status(404).json(new ApiResponse(false,404,"No user exists with this email "))
              }

              const isPasswordValid = await user.isPasswordCorrect(password)
              if(!isPasswordValid){
                     return res.status(403).json(new ApiResponse(false,403,"Incorrect password",{}))
              }

              const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)


              const options = {
                     secure : true,
                     httpOnly : true,
                     sameSite: 'None',
              }

              const userAfterRefreshTokenSaved = await User.findById(user._id).select("-password -refreshToken")

              return res.status(200).
              cookie("accessToken",accessToken,options)
              .cookie("refreshToken",refreshToken,options)
              .json(new ApiResponse(true,200,"User logged in succesfully",{
                     user : userAfterRefreshTokenSaved,
                     accessToken,
                     refreshToken
              }))
       } catch (error) {
              console.error(error)
              return res.status(500).json("Caught error in loginUser function")
       }
}


const logoutUser = async(req,res) => {
       try {
              await User.findByIdAndUpdate(
                     req.user._id,
                     {
                            $unset : {
                                   refreshToken : 1
                            },
                     },
                     {
                            new : true
                     }
              )
              const options = {
                     httpOnly : true,
                     secure : true,
                     sameSite: 'None',
              }
              return res
              .status(200)
              .clearCookie("accessToken",options)
              .clearCookie("refreshToken",options)
              .json(new ApiResponse(true,200,"User logged out successfully"))
       } catch (error) {
              console.error("Error in logoutUser function:", error)
              return res.status(500).json("Caught error in logoutUser function")
       }
}

const getCurrentUser = async(req,res) => {
       try {
              if(!req.user)
                     return res.status(500).json(new ApiResponse(false,500,"Can't find cookies while gettingCurrentUser"))
              const user = await User.findById(req.user._id)
              return new ApiResponse(true,200,"User found",user)
       } catch (error) {
              console.error(error)
              return res.status(500).json("Caught error in getCurrentUser function")
       }
}


export {registerUser,loginUser,logoutUser,getCurrentUser}