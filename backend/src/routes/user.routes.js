import { Router } from "express";
import userController from "../controllers/user.controller.js";
import protect from "../middlewares/protect.js";

const router = Router();

router.get("/user/:id", protect, userController.getSingleUser);

export default router;
