import express from 'express'
import { registerUser, loginUser, logoutUser,getCurrentUser } from '../controllers/user.controller.js'
import { verifyJwt } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/getCurrentUser").get(verifyJwt, getCurrentUser)

export default router 