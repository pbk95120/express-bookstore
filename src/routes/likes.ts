import express, { Request, Response, Router } from "express";
const router = express.Router();

router.use(express.json());

router.post("/:id", (req: Request, res: Response) => {
  res.json("좋아요 추가");
});

router.delete("/:id,", (req: Request, res: Response) => {
  res.json("좋아요 삭제");
});

module.exports = router;
