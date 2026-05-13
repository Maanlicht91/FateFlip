import express from "express";
import { getFate } from "../controllers/fateController.js";

const router = express.Router();

router.route("/fate/random").get(getFate);

export default router;
