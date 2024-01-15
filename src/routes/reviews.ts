import express, { Request, Response, Router } from "express";
import {
  addReview,
  getReviews,
  deleteReview,
  modifyReview,
} from "../controller/ReviewController.js";
const reviewRouter = express.Router();

reviewRouter.use(express.json());

reviewRouter.post("/:id", addReview);
reviewRouter.get("/:id", getReviews);
reviewRouter.delete("/:id", deleteReview);
reviewRouter.put("/:id", modifyReview);

export default reviewRouter;
