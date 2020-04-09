import { NewPatient, Gender } from "./types";

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

const toNewPatient = (object: any) => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
  };
};

export default toNewPatient;
