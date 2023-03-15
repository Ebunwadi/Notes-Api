import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";
import validateSignUp from "../middleware/validations/validateSignup";

const router = express.Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.post("/signup", validateSignUp, UserController.signUp);

router.post("/login", UserController.login);

router.post("/logout", UserController.logout);

export default router;