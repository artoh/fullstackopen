import React from "react";
import { Entry } from "../types";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalEntryDetails from "./OccupationalEntryDetails";
import HealtCheckDetails from "./HealtCheckDetails";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealtCheckDetails entry={entry} />;
    default:
      return <div></div>;
  }
};

export default EntryDetails;
