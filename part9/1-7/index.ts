import express from "express"
import { calculateBmi } from "./bmiCalculator"

const app = express()

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight)))
    return res.status(400).send({ error: "malformatted parameters" })
  return res.send({
    weigth: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: calculateBmi(Number(req.query.height), Number(req.query.weight))
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running pn port ${PORT}`)
})
