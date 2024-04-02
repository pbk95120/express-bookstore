import jwt from "jsonwebtoken";

export type ReceivedJwt = string | undefined;
export type DecodedJwt = string | jwt.JwtPayload | void;

export interface Book {
  category_id?: number;
  news?: boolean;
  limit?: string;
  currentPage?: string;
}

export interface Item {
  book_id: number;
  quantity: number;
}

export interface AllBooksProps {
  books: any;
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  totalCount: number;
}
