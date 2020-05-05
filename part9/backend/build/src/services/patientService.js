"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const utils_1 = require("../utils");
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign(Object.assign({ id: uuid_1.v1() }, utils_1.toNewPatient(patient)), { entries: [] });
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (patientId, entry) => {
    //  checkEntry(entry);
    const myEntry = Object.assign({}, utils_1.toNewEntry(entry));
    const patient = patients_1.default.find((p) => p.id == patientId);
    if (patient === undefined)
        throw new Error("Patient not found");
    patient.entries.push(myEntry);
    return myEntry;
};
const getPatient = (id) => {
    return patients_1.default.filter((e) => e.id === id)[0];
};
exports.default = {
    getNonSensitivePatients,
    addPatient,
    getPatient,
    addEntry,
};
