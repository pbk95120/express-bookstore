import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb.js";
import { RowDataPacket } from "mysql2";

/**
 * 전체 카테고리를 조회하는 get API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const allCategories = (req: Request, res: Response) => {
  const sql = "SELECT * FROM categories";

  conn.query(sql, (err, results: RowDataPacket[]) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.OK).json(results);
  });
};

export { allCategories };
