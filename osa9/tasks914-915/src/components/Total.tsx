import React from 'react';

interface Part {
  name: string;
  exerciseCount: number;
}
interface Props{
  courseParts: Array<Part>;
}

const Total = ({ courseParts }: Props): JSX.Element => {
  return(
    <>
      <br></br>
       <p>
        Total number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  )
}

export default Total;