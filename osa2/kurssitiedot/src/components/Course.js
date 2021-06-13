import React from 'react';
import CourseHeader from './CourseHeader';
import Content from './Content';

const Course = ({ course }) => {
  return (
    <>
      <CourseHeader courseName={course.name} />
      <Content parts={course.parts} />
    </>
  )
}
export default Course;