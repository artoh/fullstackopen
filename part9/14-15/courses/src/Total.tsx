import React from "react";

import { CoursePart, CourseParts } from "./types";

const Total: React.FC<CourseParts> = ({ parts }) => {
  return (
    <p>
      Number of excercises{" "}
      {parts.reduce(
        (carry: number, part: CoursePart) => carry + part.exerciseCount,
        0
      )}
    </p>
  );
};

export default Total;
