import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    if (!token) {
      throw errorHandler(401, "not authorized");
    }
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;
    console.log(req.cookies);
    next();
  } catch (error) {
    console.log(req.cookies);
    console.error(error.message);
    res.status(error.statusCode).json(error.message);
  }
};
