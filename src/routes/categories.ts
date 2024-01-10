import express, { Router } from "express";
import { allCategories } from "../controller/CategoryController.js";

const router: Router = express.Router();

router.use(express.json());

router.get("/", allCategories);

export default router;
