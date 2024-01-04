import express, { Request, Response, Router } from "express";
const router = express.Router();

router.use(express.json());

router.post("/", (req: Request, res: Response) => {
  res.json("주문 하기");
});

router.get("/,", (req: Request, res: Response) => {
  res.json("주문 목록 조회");
});

router.delete("/:id,", (req: Request, res: Response) => {
  res.json("주문 상세상품 조회");
});

module.exports = router;
