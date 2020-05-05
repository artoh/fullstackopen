import { Gender, HealthCheckRating, Entry, Diagnose } from "./types";
import { v1 as uuid } from "uuid";

const isString = (text: any): text is string => {
  return typeof text === "string";
};

const parseString = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error("Incorrect or missing string: " + text);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const isSsn = (ssn: any): boolean => {
  return Boolean(/^[0123]\d(0[1-9]|11|12)\d\d[+-A]\d\d\d[0-9A-Y]$/.test(ssn));
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error("Malformatted or missing ssn: " + ssn);
  }
  return ssn;
};

const parseRating = (rating: any): HealthCheckRating => {
  if (Object.values(HealthCheckRating).includes(rating))
    throw new Error("Incorrect or missing rating " + rating);
  return rating;
};

const parseCodes = (codes: any): Array<Diagnose["code"]> => {
  const newcodes: Array<Diagnose["code"]> = [];
  for (let i = 0; i < codes.length; i++) {
    newcodes.push(parseString(codes[i]));
  }
  return newcodes;
};

export const toNewPatient = (object: any) => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };
};

export const toNewEntry = (object: any): Entry => {
  switch (object.type) {
    case "Hospital":
      return {
        id: uuid(),
        type: object.type,
        date: parseDate(object.date),
        description: parseString(object.description),
        specialist: parseDate(object.description),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        discharge: {
          date: parseDate(object.dischage.date),
          criteria: parseString(object.dischage.criteria),
        },
      };
    case "OccupationalHealtcare":
      return {
        id: uuid(),
        type: object.type,
        date: parseDate(object.date),
        description: parseString(object.description),
        specialist: parseDate(object.description),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        employerName: parseDate(object.employerName),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        },
      };
    case "HealtCheck":
      return {
        id: uuid(),
        type: object.type,
        date: parseDate(object.date),
        description: parseString(object.description),
        specialist: parseDate(object.description),
        diagnosisCodes: parseCodes(object.diagnosisCodes),
        healthCheckRating: parseRating(object.healthCheckRating),
      };
    default:
      throw new Error("Unknow type " + object.type);
  }
};

export const checkEntry = (object: any) => {
  parseDate(object.date);
  parseString(object.description);
  parseString(object.specialist);

  switch (object.type) {
    case "Hospital":
      if (object.dischage === undefined) throw new Error("Discharge missing");
      parseDate(object.dischage.date);
      parseString(object.dischage.criteria);
      break;
    case "OccupationalHealthcare":
      parseString(object.employerName);
      if (object.sickLeave === undefined) throw new Error("Sick Leave missing");
      parseDate(object.sickLeave.startDate);
      parseDate(object.sickLeave.endDate);

      break;
    case "HealthCheck":
      if (
        isNaN(object.healthCheckRating) ||
        object.healthCheckRating < 0 ||
        object.healthCheckRating > 3
      )
        throw new Error(
          "Malformatted or missing health rate " + object.healthCheckRating
        );
      break;
    default:
      throw new Error("Unknown type " + object.type);
  }
};
