import express from "express";
import { register, login } from "../controllers.js";

const route = express.Router();

router.post("/register", redister);
router.post("/login", login);

export default router;