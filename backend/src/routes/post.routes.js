import { Router } from "express";
import postController from "../controllers/post.controller.js";
import protect from "../middlewares/protect.js";

const router = Router();

router.post("/createPost", protect, postController.createPost);
router.get("/getAllPost", protect, postController.getAllPosts);
router.get("/myPost", protect, postController.getmyPosts);
router.put("/like", protect, postController.likePosts);
router.put("/unlike", protect, postController.unLikePosts);

export default router;
