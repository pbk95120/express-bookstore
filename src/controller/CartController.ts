import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb";
import { RowDataPacket } from "mysql2";

const addToCart = (req: Request, res: Response) => {
  const { book_id, quantity, user_id } = req.body;
  const sql =
    "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";
  const values = [book_id, quantity, user_id];
  conn.query(sql, values, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const getCartItems = (req: Request, res: Response) => {
  const { user_id } = req.body;
  const sql = `SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems LEFT JOIN books ON cartItems.book_id = books.id WHERE user_id = ?`;

  conn.query(sql, user_id, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

const deleteCartItem = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "DELETE FROM cartItems WHERE id = ?";

  conn.query(sql, id, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

export { addToCart, getCartItems, deleteCartItem };
