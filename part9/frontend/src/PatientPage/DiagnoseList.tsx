import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";

const DiagnoseList: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  console.log(diagnoses);

  if (entry.diagnosisCodes === undefined) return <div></div>;

  return (
    <ul>
      {entry.diagnosisCodes.map((code) => (
        <li key={code}>
          {code} {diagnoses[code] && diagnoses[code].name}
        </li>
      ))}
    </ul>
  );
};

export default DiagnoseList;
