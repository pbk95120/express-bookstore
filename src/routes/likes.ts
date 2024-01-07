import express, { Request, Response, Router } from "express";
import { addLike, deleteLike } from "../controller/LikeController";
const router = express.Router();

router.use(express.json());

router.post("/:id", addLike);
router.delete("/:id", deleteLike);

module.exports = router;
