import React from 'react';
import CoursePart from './CoursePart';

const Content = ({ parts }) => {

  const renderCourseParts = () => {
    return parts.map(part => 
      <CoursePart key={part.id} name={part.name} exercises={part.exercises} />)
  }

  const totalOfExercises = () => {
    return parts.map(part => part.exercises)
      .reduce((acc, curr) => {
        return acc + curr;
      },0)
  }

  return (
    <>
      {renderCourseParts()}
      <p><strong>total of {totalOfExercises()} exercises</strong></p>
    </>
  )
}

export default Content;