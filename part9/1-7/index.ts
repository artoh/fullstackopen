import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight)))
    return res.status(400).send({ error: "malformatted parameters" });
  return res.send({
    weigth: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
  });
});

app.post("/exercises", (req, res) => {
  console.log("POST", req);
  if (req.body.daily_exercises == undefined || req.body.target == undefined)
    return res.status(400).send({ error: "parameters missing" });
  if (isNaN(Number(req.body.target)) || req.body.daily_exercises.length < 1)
    return res.status(400).send({ error: "malformatted parameters" });
  const hours: number[] = [];
  for (const day of req.body.daily_exercises) {
    if (isNaN(Number(day)))
      return res.status(400).send({ error: "malformatted parameters" });
    hours.push(Number(day));
  }
  return res.send(calculateExercises(hours, Number(req.body.target)));
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running pn port ${PORT}`);
});
