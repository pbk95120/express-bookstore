import express, { Router } from "express";
import { addLike, deleteLike } from "../controller/LikeController.js";

const router: Router = express.Router();

router.use(express.json());

router.post("/:id", addLike);
router.delete("/:id", deleteLike);

export default router;
