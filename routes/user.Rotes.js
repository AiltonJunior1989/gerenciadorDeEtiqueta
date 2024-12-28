import express from "express"
import { getUser, getUsers, loginUser, registerUser } from "../controllers/userControllers.js"
import { validateToken } from "../middleware/validateToken.js"

const router = express.Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/user").get(getUsers)
router.route("/user/:id").get(validateToken, getUser)

export default router