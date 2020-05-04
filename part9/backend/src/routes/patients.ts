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

router.post("/:id/entries", (req, res) => {
  try {
    res.send(patientService.addEntry(req.params.id, req.body));
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: e.message });
  }
});

export default router;
