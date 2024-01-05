import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb";
import { RowDataPacket } from "mysql2";
import { Book } from "../types/book";

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
  const { id } = req.params;
  const sql = `SELECT * FROM books LEFT JOIN categories ON books.category_id = categories.category_id WHERE books.id=?;`;

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
