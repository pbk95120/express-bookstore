import mariadb from "mysql2/";
import dotenv from "dotenv";
dotenv.config();

const connection = async () => {
  const conn = await mariadb.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,
  });
  return conn;
};

export default connection;
