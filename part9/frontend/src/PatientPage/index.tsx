import React from "react";
import axios from "axios";
import { Container, Icon, Modal, Button, Segment } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

import EntryDetails from "./EntryDetails";

import { addOrUpdatePatient, addEntry } from "../state/reducer";

import { AddHealthCheck, HeathCheckValues } from "./AddHealthCheck";
import { Z_STREAM_ERROR } from "zlib";

const PatientPage: React.FC = () => {
  const { id } = useParams();
  const [patientId] = React.useState<any>(id);
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

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

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitEntry = async (values: HeathCheckValues) => {
    try {
      const { data: entry } = await axios.post(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry(patientId, entry));
      closeModal();
    } catch (e) {
      console.log(e.error);
      setError(e.response.data.error);
    }
  };

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
      <Modal open={modalOpen} onClose={closeModal} centered={false} closeIcon>
        <Modal.Header>Add a heath check</Modal.Header>
        <Modal.Content>
          {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
          <AddHealthCheck onSubmit={submitEntry} onCancel={closeModal} />
        </Modal.Content>
      </Modal>
      <Button onClick={() => setModalOpen(true)}>Add Health Check</Button>
    </div>
  );
};

export default PatientPage;
