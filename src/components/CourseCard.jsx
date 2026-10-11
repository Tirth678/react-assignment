import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = React.memo(({ course, onDelete, onEdit }) => {
  return (
    <div className="card course-card">
      <div className="card-header">
        <h3>{course.name}</h3>
      </div>
      <div className="card-body">
        <p><strong>Code:</strong> {course.code}</p>
        <p><strong>Credits:</strong> {course.credits}</p>
        <p><strong>Department:</strong> {course.department}</p>
        <p><strong>Description:</strong> {course.description}</p>
      </div>
      <div className="card-footer">
        <Link to={`/courses/${course.id}`} className="btn btn-primary">View Details</Link>
        <button onClick={() => onEdit(course)} className="btn btn-secondary">Edit</button>
        <button onClick={() => onDelete(course.id)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;
