import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { DecodedJwt, receivedJwt } from "@/types";

/**
 * decoded 된 jwt를 반환하는 함수
 *
 * @param {Request} req 클라이언트 요청
 * @return {number} decoded 된 jwt
 */
const getDecodedJwt = (req: Request, res: Response): DecodedJwt => {
  try {
    const receivedJwt: receivedJwt = req.headers["authorization"];
    if (!receivedJwt) return res.status(StatusCodes.BAD_REQUEST).end();

    const decodedJwt = jwt.verify(
      receivedJwt,
      process.env.PRIVATE_KEY as jwt.Secret
    );

    if (decodedJwt instanceof jwt.TokenExpiredError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "expired token",
      });
    }

    if (decodedJwt instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "invalid token",
      });
    }

    return decodedJwt;
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "invalid token",
    });
  }
};

export default getDecodedJwt;
