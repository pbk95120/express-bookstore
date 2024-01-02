import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb";

const join = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  let values = [email, password];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.CREATED).json(results);
  });
};

export default join;
