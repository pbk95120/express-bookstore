import express, { Router } from "express";
import join from "../controller/UserController";

const router: Router = express.Router();

router.use(express.json());

router.post("/join", join);

router.post("/login", (req, res) => {
  res.json("로그인");
});

router.post("/reset", (req, res) => {
  res.json("비밀번호 재설정");
});

router.put("/reset", (req, res) => {
  res.json("비밀번호 재설정");
});

module.exports = router;
