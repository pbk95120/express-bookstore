import express, { Router } from "express";
import {
  addToCart,
  getCartItems,
  deleteCartItem,
} from "../controller/CartController";

const router: Router = express.Router();

router.use(express.json());

router.post("/", addToCart);
router.get("/", getCartItems);
router.delete("/:id", deleteCartItem);

module.exports = router;
