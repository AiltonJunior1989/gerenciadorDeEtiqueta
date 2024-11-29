import express from "express"
import { createTags, deleteTag, getTags, updateTag } from "../controllers/tagControllers.js"

const router = express.Router()

router.route("/").get(getTags)
router.route("/").post(createTags)
router.route("/:id").put(updateTag)
router.route("/:id").delete(deleteTag)

export default router