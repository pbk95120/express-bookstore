import express, { Router } from "express";
import { allBooks, bookDetail } from "../controller/BookController.js";

const bookRouter: Router = express.Router();

bookRouter.use(express.json());

bookRouter.get("/", allBooks);
bookRouter.get("/:id", bookDetail);

export default bookRouter;
