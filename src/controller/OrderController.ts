import mariadb from "mysql2/promise";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Item } from "@/types";
import dotenv from "dotenv";
dotenv.config();
import connection from "src/database/mariadb.js";
const order = async (req: Request, res: Response) => {
  const conn = await mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
  });
  const {
    items,
    delivery,
    firstBookTitle,
    totalQuantity,
    totalPrice,
    user_id,
  } = req.body;

  let sql =
    "INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)";
  let values = [delivery.address, delivery.receiver, delivery.contact];
  let [results]: any = await conn.execute(sql, values);
  const delivery_id = results.insertId;

  sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) VALUES (?, ?, ?, ?, ?)`;
  values = [firstBookTitle, totalQuantity, totalPrice, user_id, delivery_id];
  [results] = await conn.execute(sql, values);
  const order_id = results.insertId;

  sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
  values = [];
  items.forEach((item: Item) => {
    values.push([order_id, item.book_id, item.quantity]);
  });

  results = await conn.query(sql, [values]);
  return res.status(StatusCodes.OK).json(results[0]);
};

const getOrders = async (req: Request, res: Response) => {
  const conn = await mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
  });

  const sql =
    "SELECT orders.id, book_title, total_quantity, total_price, created_at, address, receiver, contact FROM orders LEFT JOIN delivery ON orders.delivery_id = delivery.id";
  const [rows, fields] = await conn.query(sql);
  return res.status(StatusCodes.OK).json(rows);
};

const getOrderDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const conn = await mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
  });

  const sql =
    "SELECT book_id, title, author, price, quantity FROM orderedBook LEFT JOIN books ON orderedBook.book_id = books.id WHERE order_id = ?";
  const [rows, fields] = await conn.query(sql, [id]);
  return res.status(StatusCodes.OK).json(rows);
};

export { order, getOrders, getOrderDetail };
