import express, { Router } from "express";
import { allBooks, bookDetail } from "../controller/BookController.js";

const router: Router = express.Router();

router.use(express.json());

router.get("/", allBooks);
router.get("/:id", bookDetail);

export default router;
