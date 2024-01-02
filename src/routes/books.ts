import express, { Request, Response, Router } from "express";
const router = express.Router();

router.use(express.json());

router.get("/", (req: Request, res: Response) => {
  res.json("전체 도서 조회");
});

router.get("/:id,", (req: Request, res: Response) => {
  res.json("도서 상세 조회");
});

router.get("/category", (req: Request, res: Response) => {
  res.json("카테고리별 도서 조회");
});

module.exports = router;
