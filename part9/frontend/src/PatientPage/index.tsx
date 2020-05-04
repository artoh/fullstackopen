import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

import EntryDetails from "./EntryDetails";

import { addOrUpdatePatient } from "../state/reducer";

const PatientPage: React.FC = () => {
  const { id } = useParams();
  const [patientId] = React.useState<any>(id);
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    const getPatient = async (patientId: string) => {
      if (
        patients[patientId] === undefined ||
        patients[patientId].ssn === undefined
      ) {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch(addOrUpdatePatient(patientFromApi));
      }
    };
    getPatient(patientId);
    console.log(patients);
  }, [dispatch, patients, patientId]);

  return (
    <div className="App">
      {patients[patientId] && (
        <Container>
          <h3>
            {patients[patientId].name}
            {patients[patientId].gender === "female" && <Icon name="venus" />}
            {patients[patientId].gender === "male" && <Icon name="mars" />}
          </h3>
          <p>
            ssn: {patients[patientId].ssn}
            <br />
            occupation: {patients[patientId].occupation}
          </p>
          <h4>Entries</h4>
          {patients[patientId].entries.map((entry) => (
            <EntryDetails entry={entry} />
          ))}
        </Container>
      )}
    </div>
  );
};

export default PatientPage;
