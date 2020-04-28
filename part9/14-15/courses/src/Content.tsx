import React from "react";

import { CoursePart, CourseParts } from "./types";
import Part from "./Part";

const Content: React.FC<CourseParts> = ({ parts }) => {
  return (
    <div>
      {parts.map((elem: CoursePart) => (
        <div key={elem.name}>
          <Part {...elem} />
        </div>
      ))}
    </div>
  );
};

export default Content;
