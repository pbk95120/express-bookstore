import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import conn from "../database/mariadb.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import { RowDataPacket } from "mysql2";
dotenv.config();

/**
 * 로그인 요청을 하는 post API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
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

  conn.query(sql, email, (err, results: RowDataPacket[]) => {
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
          id: loginUser.id,
          email: loginUser.email,
        },
        process.env.PRIVATE_KEY || "",
        { expiresIn: "30m", issuer: "park" }
      );

      res.cookie("token", token, { httpOnly: true });
      console.log(token);
      return res.status(StatusCodes.OK).json(results);
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }
  });
};

/**
 * 비밀번호 초기화 요청을 하는 post API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const passwordResetRequest = (req: Request, res: Response) => {
  const { email } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  conn.query(sql, email, (err, results: RowDataPacket[]) => {
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

/**
 * 비밀번호 초기화를 하는 put API
 *
 * @param {Request} req 클라이언트 요청
 * @param {Response} res 서버 응답
 * @return void
 */
const passwordReset = (req: Request, res: Response) => {
  const { email, password } = req.body;
  const sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 10, "sha512")
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
