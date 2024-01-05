import express, { Router } from "express";
import { allCategories } from "../controller/CategoryController";

const router: Router = express.Router();

router.use(express.json());

router.get("/", allCategories);

module.exports = router;
