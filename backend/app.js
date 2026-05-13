import express from "express";
import fateRoutes from "./src/routes/fateRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", fateRoutes);

app.get("/", (req, res) => {
  res.send("It's working now");
});

export default app;
