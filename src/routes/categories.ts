import express, { Router } from "express";
import { allCategories } from "../controller/CategoryController.js";

const categoryRouter: Router = express.Router();

categoryRouter.use(express.json());

categoryRouter.get("/", allCategories);

export default categoryRouter;
