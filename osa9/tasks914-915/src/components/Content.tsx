import React from 'react';
import Part from './Part';
import { CoursePartProps } from '../types';

interface Props{
  courseParts: Array<CoursePartProps>;
}

const Content = ({ courseParts }: Props): JSX.Element => {
  return(
    <>
      {courseParts.map((part, index) => (
        <p key={index}>
          <Part part={part} />
        </p>
      ))}
    </>
  )
}

export default Content;