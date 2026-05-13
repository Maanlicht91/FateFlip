import express from "express";
import fateRoutes from "./src/routes/fateRoutes.js";
import cors from "cors";
import { config } from "dotenv";

config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET"],
  }),
);
app.use(express.json());
app.use("/api/v1", fateRoutes);

app.get("/", (req, res) => {
  res.send("It's working now");
});

export default app;
