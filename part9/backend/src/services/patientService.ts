import patients from "../../data/patients";

import { NonSensitivePatient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients;
};

export default {
  getNonSensitivePatients,
};
