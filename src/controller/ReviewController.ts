import conn from "../database/mariadb.js";
import getDecodedJwt from "../utils/getDecodedJwt.js";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * 리뷰를 작성하는 post API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const addReview = (req: Request, res: Response) => {
  const book_id = req.params.id;
  const decodedJwt = getDecodedJwt(req, res) as jwt.JwtPayload;
  const { rating, content, reviewPictureUrl } = req.body;
  try {
    const sql =
      "INSERT INTO reviews (user_id, book_id, rating, content, reviewPictureUrl, created_date, modified_date) VALUES (?, ?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE)";
    const values = [decodedJwt.id, book_id, rating, content, reviewPictureUrl];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(result);
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

/**
 * 리뷰를 받아오는 get API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const getReviews = (req: Request, res: Response) => {
  const book_id = req.params.id;
  try {
    const sql = "SELECT * FROM reviews WHERE book_id = ?";
    const values = [book_id];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(result);
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

/**
 * 리뷰를 삭제하는 delete API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const deleteReview = (req: Request, res: Response) => {
  const review_id = req.params.id;
  try {
    const sql = "DELETE FROM reviews WHERE id = ?";
    const values = [review_id];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(result);
    });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

/**
 * 리뷰를 수정하는 put API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const modifyReview = (req: Request, res: Response) => {
  const review_id = req.params.id;
  const { rating, content, reviewPictureUrl } = req.body;
  try {
    const sql =
      "UPDATE reviews SET rating = ?, content = ?, reviewPictureUrl = ?, modified_date = CURRENT_DATE WHERE id = ?";
    const values = [rating, content, reviewPictureUrl, review_id];

    conn.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(result);
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};

export { addReview, getReviews, deleteReview, modifyReview };
