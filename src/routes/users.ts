import express, { Router } from "express";
import {
  join,
  login,
  passwordResetRequest,
  passwordReset,
} from "../controller/UserController";

const router: Router = express.Router();

router.use(express.json());

router.post("/join", join);
router.post("/login", login);
router.post("/reset", passwordResetRequest);
router.put("/reset", passwordReset);

module.exports = router;
