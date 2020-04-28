interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface DescribedCoursePart extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends DescribedCoursePart {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends DescribedCoursePart {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartOwn extends DescribedCoursePart {
  name: "Random type usage";
  tries: number;
}

export type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartOwn;

export interface CourseParts {
  parts: CoursePart[];
}
