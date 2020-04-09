import patients from "../../data/patients";
import { v1 as uuid } from "uuid";
import toNewPatient from "../utils";

import { NonSensitivePatient, NewPatient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients;
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
  const newPatient = {
    id: uuid(),
    ...toNewPatient(patient),
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient,
};
