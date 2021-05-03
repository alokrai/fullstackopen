import React from "react";

const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ course }) => {
  return (
    <p>
      {course.name} {course.exercises}
    </p>
  );
};

const Content = ({ part1, part2, part3 }) => {
  return (
    <>
      <Part course={part1} />
      <Part course={part2} />
      <Part course={part3} />
    </>
  );
};

const Total = ({ part1, part2, part3 }) => {
  const total = part1.exercises + part2.exercises + part3.exercises;
  return `Number of exercises ${total}`;
};

const App = () => {
  const course = {
    heading: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header title={course.heading} />
      <Content
        part1={course.parts[0]}
        part2={course.parts[1]}
        part3={course.parts[2]}
      />

      <Total
        part1={course.parts[0]}
        part2={course.parts[1]}
        part3={course.parts[2]}
      />
    </div>
  );
};

export default App;
