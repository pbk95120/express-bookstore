import express, { Router } from "express";
import {
  addToCart,
  getCartItems,
  deleteCartItem,
} from "../controller/CartController.js";

const cartRouter: Router = express.Router();

cartRouter.use(express.json());

cartRouter.post("/", addToCart);
cartRouter.get("/", getCartItems);
cartRouter.delete("/:id", deleteCartItem);

export default cartRouter;
