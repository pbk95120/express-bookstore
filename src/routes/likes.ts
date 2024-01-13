import express, { Router } from "express";
import { addLike, deleteLike } from "../controller/LikeController.js";

const likeRouter: Router = express.Router();

likeRouter.use(express.json());

likeRouter.post("/:id", addLike);
likeRouter.delete("/:id", deleteLike);

export default likeRouter;
