"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const uuid_1 = require("uuid");
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
const parseRating = (rating) => {
    if (Object.values(types_1.HealthCheckRating).includes(rating))
        throw new Error("Incorrect or missing rating " + rating);
    return rating;
};
const parseCodes = (codes) => {
    const newcodes = [];
    for (let i = 0; i < codes.length; i++) {
        newcodes.push(parseString(codes[i]));
    }
    return newcodes;
};
exports.toNewPatient = (object) => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
    };
};
exports.toNewEntry = (object) => {
    switch (object.type) {
        case "Hospital":
            return {
                id: uuid_1.v1(),
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
                id: uuid_1.v1(),
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
                id: uuid_1.v1(),
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
exports.checkEntry = (object) => {
    parseDate(object.date);
    parseString(object.description);
    parseString(object.specialist);
    switch (object.type) {
        case "Hospital":
            if (object.dischage === undefined)
                throw new Error("Discharge missing");
            parseDate(object.dischage.date);
            parseString(object.dischage.criteria);
            break;
        case "OccupationalHealthcare":
            parseString(object.employerName);
            if (object.sickLeave === undefined)
                throw new Error("Sick Leave missing");
            parseDate(object.sickLeave.startDate);
            parseDate(object.sickLeave.endDate);
            break;
        case "HealthCheck":
            if (isNaN(object.healthCheckRating) ||
                object.healthCheckRating < 0 ||
                object.healthCheckRating > 3)
                throw new Error("Malformatted or missing health rate " + object.healthCheckRating);
            break;
        default:
            throw new Error("Unknown type " + object.type);
    }
};
