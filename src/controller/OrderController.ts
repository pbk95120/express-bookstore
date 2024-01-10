import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb.js";
import { RowDataPacket } from "mysql2";
import { Item } from "../types/order";

const order = (req: Request, res: Response) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;
  let delivery_id = 0;
  let order_id = 0;

  let sql =
    "INSERT INTO delivery (address ,receiver, contact) VALUES (?, ?, ?)";
  let values = [delivery.address, delivery.receiver, delivery.contact];
  let [results] = conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    delivery_id = results.insertId;
  });

  sql =
    "INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)";
  values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    order_id = results.insertId;
  });

  sql = "INSERT INTO orderBook (order_id, book_id, quantity) VALUES ?";

  values = [];
  items.forEach((item: Item) => {
    values.push([order_id, item.book_id, item.quantity]);
  });

  conn.query(sql, [values], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

const getOrders = (req: Request, res: Response) => {
  const sql = "SELECT * FROM categories";

  conn.query(sql, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const getOrderDetail = (req: Request, res: Response) => {
  const sql = "SELECT * FROM categories";

  conn.query(sql, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

export { order, getOrders, getOrderDetail };
