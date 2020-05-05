"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatients());
});
router.post("/", (req, res) => {
    res.send(patientService_1.default.addPatient(req.body));
});
router.get("/:id", (req, res) => {
    res.send(patientService_1.default.getPatient(req.params.id));
});
router.post("/:id/entries", (req, res) => {
    try {
        res.send(patientService_1.default.addEntry(req.params.id, req.body));
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ error: e.message });
    }
});
exports.default = router;
