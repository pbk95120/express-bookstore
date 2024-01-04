import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb";

const allBooks = (req: Request, res: Response) => {
  res.json("1");
};

const bookDetail = (req: Request, res: Response) => {
  res.json("2");
};

const booksByCategory = (req: Request, res: Response) => {
  res.json("3");
};

export { allBooks, bookDetail, booksByCategory };
