import React from "react";
import { OccupationalHeathcareEntry } from "../types";
import DiagnoseList from "./DiagnoseList";
import { Segment, Icon } from "semantic-ui-react";

const OccupationalEntryDetails: React.FC<{
  entry: OccupationalHeathcareEntry;
}> = ({ entry }) => {
  return (
    <Segment>
      <h5>
        {entry.date}
        <Icon name="user doctor" />
        {entry.specialist} / {entry.employerName}
      </h5>
      <p>{entry.description}</p>
      <p>
        Sick leave {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
      </p>
      <DiagnoseList entry={entry} />
    </Segment>
  );
};

export default OccupationalEntryDetails;
