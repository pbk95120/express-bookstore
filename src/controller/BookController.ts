import conn from "../database/mariadb.js";
import getDecodedJwt from "../utils/getDecodedJwt.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RowDataPacket } from "mysql2";
import { Book } from "@/types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const allBooks = (req: Request, res: Response) => {
  const { category_id, news, limit, currentPage }: Book = req.query;

  const offset = Number(limit) * (Number(currentPage) - 1);
  let sql = "SELECT * FROM books";
  let values: (number | string | boolean)[] = [];

  if (category_id && news) {
    sql +=
      " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values = [category_id];
  } else if (category_id) {
    sql += " WHERE category_id=?";
    values = [category_id];
  } else if (news) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  }

  sql += " LIMIT ? OFFSET ?";
  values.push(Number(limit), Number(offset));

  conn.query(sql, values, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length) {
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

const bookDetail = (req: Request, res: Response) => {
  const book_id = req.params.id;
  const { user_id } = req.body;

  const sql = `SELECT *,(SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes,
  (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked
  FROM books LEFT JOIN categories ON books.category_id = categories.category_id WHERE books.id=?;`;
  const values = [user_id, book_id, book_id];

  conn.query(sql, values, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results[0]) {
      return res.status(StatusCodes.OK).json(results[0]);
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

export { allBooks, bookDetail };
