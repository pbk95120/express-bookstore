import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb.js";

const addLike = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id } = req.body;

  const sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
  const values = [user_id, id];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};

const deleteLike = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id } = req.body;

  const sql = "DELETE FROM likes WHERE user_id=? AND liked_book_id=?";
  const values = [user_id, id];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};

export { addLike, deleteLike };
