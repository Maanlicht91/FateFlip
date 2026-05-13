import express from "express";
import fateRoutes from "./src/routes/fateRoutes.js";
import cors from "cors";

const app = express();
const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());
app.use("/api/v1", fateRoutes);

app.get("/", (req, res) => {
  res.send("It's working now");
});

export default app;
