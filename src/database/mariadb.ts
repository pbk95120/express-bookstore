import mariadb from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mariadb.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "Bookshop",
  dateStrings: true,
});

export default connection;
