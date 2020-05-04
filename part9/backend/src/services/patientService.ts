import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import { toNewPatient, checkEntry } from "../utils";

import {
  NonSensitivePatient,
  NewPatient,
  Patient,
  NewEntry,
  Entry,
} from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuid(),
    ...toNewPatient(patient),
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry) => {
  checkEntry(entry);
  const myEntry = {
    id: uuid,
    ...entry,
  };
  const patient = patients.find((p) => p.id == patientId);
  if (patient === undefined) throw new Error("Patient not found");
  patient.entries.push(myEntry);
  return myEntry;
};

const getPatient = (id: string): Patient => {
  return patients.filter((e) => e.id === id)[0];
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry,
};
