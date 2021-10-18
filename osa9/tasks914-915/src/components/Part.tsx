import React from 'react';
import { CoursePartProps } from '../types';

interface Props {
  part: CoursePartProps;
}

const Part = ({ part }: Props): JSX.Element => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const renderPart = () => {
    switch (part.type) {
      case "normal":        
        return (
          <>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
          </>
        )
      case "groupProject":
        return (
          <>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>Project exercises: {part.groupProjectCount}</p>
          </>
        )
      case "submission":
        return (
          <>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
            <p>Submit to: {part.exerciseSubmissionLink}</p>
          </>
        )
      case "special":
        return (
          <>
            <h3>{part.name} {part.exerciseCount}</h3>
            <p>{part.description}</p>
            <p>Requirements: {part.requirements.join(', ')}</p>
          </>
        )
      default:
        return assertNever(part);
    }
  }

  return(
    <>
      {renderPart()}
    </>
  )
}

export default Part;