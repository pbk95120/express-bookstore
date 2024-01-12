import conn from "../database/mariadb.js";
import getDecodedJwt from "../utils/getDecodedJwt.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * 책의 좋아요 버튼을 누르는 post API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const addLike = (req: Request, res: Response): void => {
  const book_id = req.params.id;
  const decodedJwt = getDecodedJwt(req, res) as jwt.JwtPayload;

  const sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
  const values = [decodedJwt.id, book_id];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};

/**
 * 책의 좋아요 버튼을 삭제하는 delete API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const deleteLike = (req: Request, res: Response): void => {
  const book_id = req.params.id;
  const decodedJwt = getDecodedJwt(req, res) as jwt.JwtPayload;

  const sql = "DELETE FROM likes WHERE user_id=? AND liked_book_id=?";
  const values = [decodedJwt.id, book_id];
  conn.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(result);
  });
};

export { addLike, deleteLike };
