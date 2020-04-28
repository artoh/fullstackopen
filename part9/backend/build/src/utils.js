"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string";
};
const parseString = (text) => {
    if (!text || !isString(text)) {
        throw new Error("Incorrect or missing string: " + text);
    }
    return text;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};
const isSsn = (ssn) => {
    return Boolean(/^[0123]\d(0[1-9]|11|12)\d\d[+-A]\d\d\d[0-9A-Y]$/.test(ssn));
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error("Malformatted or missing ssn: " + ssn);
    }
    return ssn;
};
const toNewPatient = (object) => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
    };
};
exports.default = toNewPatient;
