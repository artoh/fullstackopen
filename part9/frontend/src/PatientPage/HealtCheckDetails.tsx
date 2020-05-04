import React from "react";
import { HealthCheckEntry } from "../types";
import { Segment, Icon } from "semantic-ui-react";
import DiagnoseList from "./DiagnoseList";
import HealthRatingBar from "../components/HealthRatingBar";

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({
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
      <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
      <DiagnoseList entry={entry} />
    </Segment>
  );
};

export default HealthCheckDetails;
