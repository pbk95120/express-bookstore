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
const addReview = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(1);
};

/**
 * 책의 좋아요 버튼을 삭제하는 delete API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const getReviews = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(1);
};

/**
 * 책의 좋아요 버튼을 삭제하는 delete API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const deleteReview = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(1);
};

/**
 * 책의 좋아요 버튼을 삭제하는 delete API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const modifyReview = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json(1);
};

export { addReview, getReviews, deleteReview, modifyReview };
