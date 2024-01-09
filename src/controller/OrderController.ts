import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb";
import { RowDataPacket } from "mysql2";

const order = (req: Request, res: Response) => {
  const {
    itemds,
    delivery,
    totalQuantity,
    totalPrice,
    userId,
    firstBookTitle,
  } = req.body;
  let delivery_id = 3;
  let sql =
    "INSERT INTO delivery (address ,receiver, contact) VALUES (?, ?, ?)";
  sql =
    "INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?,?)";
  const values = [
    firstBookTitle,
    totalQuantity,
    totalPrice,
    userId,
    delivery_id,
  ];

  conn.query(sql, values, (err, results) => {
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
