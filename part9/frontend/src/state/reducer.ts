import { State, StateContext } from "./state";
import { Patient, Diagnosis, Entry } from "../types";
import { CommentAction } from "semantic-ui-react";

interface AddEntryPayload {
  id: string;
  entry: Entry;
}

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: AddEntryPayload;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        diagnoses: action.payload,
      };
    case "ADD_ENTRY":
      const patients = state.patients;
      const patient = patients[action.payload.id];
      patient.entries.push(action.payload.entry);
      return {
        ...state,
        patients: patients,
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addOrUpdatePatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const setDiagnoseList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnoses,
  };
};

export const addEntry = (patientId: string, entry: Entry): Action => {
  return {
    type: "ADD_ENTRY",
    payload: { id: patientId, entry: entry },
  };
};
