import express from "express";

import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  res.send(patientService.addPatient(req.body));
});

router.get("/:id", (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

export default router;
