import mariadb from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mariadb.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  dateStrings: true,
});

export default connection;
