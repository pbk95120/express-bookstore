import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb";
import { RowDataPacket } from "mysql2";

const allBooks = (req: Request, res: Response) => {
  const { category_id } = req.params;

  if (category_id) {
    const sql = "SELECT * FROM books category_id = ?";
    conn.query(sql, category_id, (err, results: RowDataPacket[]) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      if (results.length) {
        return res.status(StatusCodes.OK).json(results);
      }
      return res.status(StatusCodes.NOT_FOUND).end();
    });
  } else {
    const sql = "SELECT * FROM books";
    conn.query(sql, (err, results: RowDataPacket[]) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

const bookDetail = (req: Request, res: Response) => {
  const { id } = req.params;
  const sql = "SELECT * FROM books WHERE id = ?";

  conn.query(sql, id, (err, results: RowDataPacket[]) => {
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

// const booksByCategory = (req: Request, res: Response) => {
//   const { category_id } = req.params;
//   const sql = "SELECT * FROM books category_id = ?";

//   conn.query(sql, category_id, (err, results: RowDataPacket[]) => {
//     if (err) {
//       console.log(err);
//       return res.status(StatusCodes.BAD_REQUEST).end();
//     }

//     if (results.length) {
//       return res.status(StatusCodes.OK).json(results);
//     }
//     return res.status(StatusCodes.NOT_FOUND).end();
//   });
// };

export { allBooks, bookDetail };
