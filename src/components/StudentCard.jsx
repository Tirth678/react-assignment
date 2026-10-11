import React from 'react';
import { Link } from 'react-router-dom';

const StudentCard = React.memo(({ student, onDelete, onEdit }) => {
  const getAttendanceStatus = (attendance) => {
    if (attendance >= 75) return { status: 'Eligible', class: 'eligible' };
    if (attendance >= 60) return { status: 'Warning', class: 'warning' };
    return { status: 'Detained', class: 'detained' };
  };

  const attendanceInfo = getAttendanceStatus(student.attendance);

  return (
    <div className="card student-card">
      <div className="card-header">
        <h3>{student.name}</h3>
        <span className={`attendance-badge ${attendanceInfo.class}`}>
          {attendanceInfo.status}
        </span>
      </div>
      <div className="card-body">
        <p><strong>Enrollment:</strong> {student.enrollmentNumber}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Course:</strong> {student.course}</p>
        <p><strong>Semester:</strong> {student.semester}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Attendance:</strong> {student.attendance}%</p>
      </div>
      <div className="card-footer">
        <Link to={`/students/${student.id}`} className="btn btn-primary">View Details</Link>
        <button onClick={() => onEdit(student)} className="btn btn-secondary">Edit</button>
        <button onClick={() => onDelete(student.id)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
});

StudentCard.displayName = 'StudentCard';

export default StudentCard;
