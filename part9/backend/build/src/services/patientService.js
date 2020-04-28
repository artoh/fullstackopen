"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const utils_1 = __importDefault(require("../utils"));
const getNonSensitivePatients = () => {
    return patients_1.default;
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v1() }, utils_1.default(patient));
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getNonSensitivePatients,
    addPatient,
};
