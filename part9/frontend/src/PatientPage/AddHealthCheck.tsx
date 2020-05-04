import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form, ErrorMessage } from "formik";

import {
  TextField,
  DiagnosisSelection,
  NumberField,
} from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

export type HeathCheckValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: HeathCheckValues) => void;
  onCancel: () => void;
}

export const AddHealthCheck: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        description: "",
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        } else if (Boolean(Date.parse(values.date)) === false) {
          errors.date = "Misformatted date";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Doctor's name"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              diagnoses={diagnoses}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Healt Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddHealthCheck;
