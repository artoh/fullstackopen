import React from "react";
import { HealthCheckEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";
import DiagnoseList from "./DiagnoseList";
import HealthRatingBar from "../components/HealthRatingBar";

const colorForHealth = (level: number): any => {
  switch (level) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "orange";
    case 3:
      return "red";
    default:
      return "black";
  }
};

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <Segment>
      <h5>
        {entry.date}
        <Icon name="stethoscope" />
        {entry.specialist}
      </h5>
      <p>{entry.description}</p>
      <Icon name="heart" color={colorForHealth(entry.healthCheckRating)} />
      <DiagnoseList entry={entry} />
    </Segment>
  );
};

export default HealthCheckDetails;
