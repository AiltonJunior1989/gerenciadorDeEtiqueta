import express from "express"
import { createTags, deleteTag, getTags, updateTag } from "../controllers/tagControllers.js"
import { validateToken } from "../middleware/validateToken.js"

const app = express()

const router = express.Router()



// router.route("/").get(getTags)
router.get("/", validateToken, getTags)
router.route("/").post(validateToken, createTags)
router.route("/:id").put(updateTag)
router.route("/:id").delete(validateToken, deleteTag)

export default router