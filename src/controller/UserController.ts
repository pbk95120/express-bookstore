import express, { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const join = (req: Request, res: Response) => {
  const { email, password } = req.body;

  const sql = "INSERT INTO users (email, password, salt) VALUES (?, ?, ?)";
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 10, "sha512")
    .toString("base64");
  const values = [email, hashPassword, salt];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    return res.status(StatusCodes.CREATED).json(results);
  });
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  conn.query(sql, email, (err, results: any) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const loginUser = results[0];
    const hashPassword = crypto
      .pbkdf2Sync(password, loginUser.salt, 100000, 10, "sha512")
      .toString("base64");

    if (loginUser && loginUser.password === hashPassword) {
      const token = jwt.sign(
        {
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY || "",
        { expiresIn: "5m", issuer: "park" }
      );

      res.cookie("token", token, { httpOnly: true });
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

const passwordResetRequest = (req: Request, res: Response) => {
  const { email } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  conn.query(sql, email, (err, results: any) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).json({
        email: email,
      });
    } else {
      return res.status(StatusCodes.NOT_FOUND).end();
    }
  });
};

const passwordReset = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = "UPDATE users SET password = ?, salt = ? WHERE email = ?";
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 10, "sha512")
    .toString("base64");
  const values = [hashPassword, salt, email];

  conn.query(sql, values, (err, results: any) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).end();
    } else {
      return res.status(StatusCodes.OK).json(results);
    }
  });
};

export { join, login, passwordResetRequest, passwordReset };
