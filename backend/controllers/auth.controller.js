import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    const existingEmail = await User.findOne({ email });


    if (existingEmail) {
      throw { statusCode: 409, message: "Email already exists" };
    }
    await newUser.save();
    res.status(201).json({ message: "Registration successful! Now Login." });
  } catch (error) {
    console.error(error.message);
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ error: error.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      throw errorHandler(404, "User not found");
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      throw errorHandler(401, "wrong credentials");
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error({ error: error.message });
    res.status(error.statusCode).json({ error: error.message });
  }
};

export const signOut = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (token) {
      res.clearCookie("access_token");
      res.status(200).json("User has been logged out!");
    } else {
      throw errorHandler(404, "User is already logged out.");
    }
  } catch (error) {
    console.error(error.message);
    res.status(error.statusCode).json(error.message);
  }
};

export const checkRoute = async (req, res) => {
  try {
    if (req.user) {
      res.json({ isAuthenticated: true });
    } else {
      throw errorHandler(500, "internal server error");
    }
  } catch (error) {
    console.error({ error: error.message });
    res.status(error.statusCode).json({ error: error.message });
  }
};
