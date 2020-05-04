import React from "react";
import { HospitalEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";
import DiagnoseList from "./DiagnoseList";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => {
  return (
    <Segment>
      <h5>
        {entry.date}
        <Icon name="hospital" />
        {entry.specialist}
      </h5>
      <p>{entry.description}</p>
      <p>
        Discharge {entry.discharge.date} {entry.discharge.criteria}
      </p>
      <DiagnoseList entry={entry} />
    </Segment>
  );
};

export default HospitalEntryDetails;
