import React from "react";

import { CoursePart, CourseParts } from "./types";

const Content: React.FC<CourseParts> = ({ parts }) => {
  return (
    <div>
      {parts.map((elem: CoursePart) => (
        <p key={elem.name}>
          {" "}
          {elem.name} {elem.exerciseCount}{" "}
        </p>
      ))}
    </div>
  );
};

export default Content;
