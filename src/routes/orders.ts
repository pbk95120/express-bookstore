import express, { Request, Response, Router } from "express";
const router = express.Router();

router.use(express.json());

router.post("/", (req: Request, res: Response) => {
  res.json("장바구니 담기");
});

router.get("/,", (req: Request, res: Response) => {
  res.json("장바구니 조회");
});

router.delete("/:id,", (req: Request, res: Response) => {
  res.json("장바구니 도서 삭제");
});

module.exports = router;
