import React from "react";

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  );
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
}

const Content = ({ parts }) => {
  const renderParts = () => {
    return parts.map((part,index) => <Part part={part.name} exercises={part.exercises} key={index}/>);
  }

  return (
    <>
      {renderParts()}
    </>
  );
}

const Total = ({ parts }) => {
  const countExercises = () => {
    let value = 0;
    parts.forEach(part => value += part.exercises);
    return value;
  }

  return (
    <>
      <p>
        Number of exercises {countExercises()}
      </p>
    </>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: "Fundamendals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />      
    </div>
  );
}

export default App;
