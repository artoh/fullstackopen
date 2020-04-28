import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import toNewPatient from "../utils";

import { NonSensitivePatient, NewPatient, Patient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients;
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...toNewPatient(patient),
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient => {
  return patients.filter((e) => e.id === id)[0];
};

export default {
  getNonSensitivePatients,
  addPatient,
  getPatient,
};
