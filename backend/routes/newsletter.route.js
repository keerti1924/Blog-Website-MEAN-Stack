// newsletter.route.js
import express from "express";

import { newsletter } from "../controllers/newsletter.controller.js";

const subscriberouter = express.Router();

subscriberouter.post("/newsletter", newsletter);

export default subscriberouter;

