import express from "express";
import { contact } from "../controllers/contact.controller.js";

const contactRouter = express.Router();

contactRouter.post("/contact", contact);

export default contactRouter