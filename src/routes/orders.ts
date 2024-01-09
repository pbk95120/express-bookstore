import express, { Request, Response, Router } from "express";
import {
  order,
  getOrders,
  getOrderDetail,
} from "../controller/OrderController";

const router = express.Router();

router.use(express.json());

router.post("/", order);
router.get("/", getOrders);
router.delete("/:id", getOrderDetail);

module.exports = router;
