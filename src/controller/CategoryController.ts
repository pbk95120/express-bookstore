import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb";
import { RowDataPacket } from "mysql2";

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
