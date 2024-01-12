import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

/**
 * decoded 된 jwt를 반환하는 함수
 *
 * @param {Request} req 클라이언트 요청
 * @return {number} decoded 된 jwt
 */
const getDecodedJwt = (
  req: Request,
  res: Response
): string | jwt.JwtPayload => {
  const receivedJwt: string | undefined = req.headers["authorization"];
  if (!receivedJwt) return res.status(StatusCodes.BAD_REQUEST).end();

  const decodedJwt = jwt.verify(
    receivedJwt,
    process.env.PRIVATE_KEY as jwt.Secret
  );
  if (!decodedJwt) return res.status(StatusCodes.BAD_REQUEST).end();

  return decodedJwt;
};

export default getDecodedJwt;
