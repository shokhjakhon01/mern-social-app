import { Router } from "express";
import userController from "../controllers/user.controller.js";
import protect from "../middlewares/protect.js";

const router = Router();

router.get("/user/:id", protect, userController.getSingleUser);
router.put("/follow", protect, userController.followers);
router.put("/unfollow", protect, userController.unfollowers);
router.get("/getSubspost", protect, userController.getSubscribePosts);

export default router;
