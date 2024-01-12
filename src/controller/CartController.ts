import conn from "../database/mariadb.js";
import getDecodedJwt from "../utils/getDecodedJwt.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";

/**
 * 장바구니에 책을 담는 post API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const addToCart = (req: Request, res: Response): void => {
  const { book_id, quantity } = req.body;
  const decodedJwt = getDecodedJwt(req, res) as jwt.JwtPayload;

  const sql =
    "INSERT INTO cartItems (book_id, quantity, user_id) VALUES (?, ?, ?)";
  const values = [book_id, quantity, decodedJwt.id];
  conn.query(sql, values, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

/**
 * 장바구니에 담긴 책을 요청하는 get API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const getCartItems = (req: Request, res: Response) => {
  const { selected_id } = req.body;
  const decodedJwt = getDecodedJwt(req, res) as jwt.JwtPayload;

  const sql =
    "SELECT cartItems.id, book_id, title, summary, quantity, price FROM cartItems LEFT JOIN books ON cartItems.book_id = books.id WHERE user_id = ? AND cartItems.id In (?)";

  const values = [decodedJwt.id, selected_id];
  conn.query(sql, values, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

/**
 * 장바구니에 담긴 책을 삭제하는 delete API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const deleteCartItem = (req: Request, res: Response): void => {
  const cartItemId = req.params.id;
  const sql = "DELETE FROM cartItems WHERE id = ?";

  conn.query(sql, cartItemId, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

export { addToCart, getCartItems, deleteCartItem };
