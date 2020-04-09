import express from "express";
const cors = require("cors");
import diagnoseRouter from "./routes/diagnoses";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("Someone pinging");
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRouter);

app.listen(PORT, () => {
  console.log(`Patientor server running on port ${PORT}`);
});
