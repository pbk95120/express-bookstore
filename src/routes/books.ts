import express, { Router } from "express";
import {
  allBooks,
  bookDetail,
  booksByCategory,
} from "../controller/BookController";

const router: Router = express.Router();

router.use(express.json());

router.get("/", allBooks);
router.get("/:id,", bookDetail);
router.get("/category", booksByCategory);

module.exports = router;
