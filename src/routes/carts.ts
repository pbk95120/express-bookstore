import express, { Router } from "express";
import {
  addToCart,
  getCartItems,
  deleteCartItem,
} from "../controller/CartController.js";

const router: Router = express.Router();

router.use(express.json());

router.post("/", addToCart);
router.get("/", getCartItems);
router.delete("/:id", deleteCartItem);

export default router;
