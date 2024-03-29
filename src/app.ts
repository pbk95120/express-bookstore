import express, { Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users.js";
import bookRouter from "./routes/books.js";
import categoryRouter from "./routes/categories.js";
import likeRouter from "./routes/likes.js";
import cartRouter from "./routes/carts.js";
import orderRouter from "./routes/orders.js";
import reviewRoute from "./routes/reviews.js";
import cors from "cors";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => console.log("Server is running"));
app.use(cors());
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRouter);
app.use("/likes", likeRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRoute);

export default app;
