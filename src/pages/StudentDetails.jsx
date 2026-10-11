import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaExclamationTriangle, FaBan } from 'react-icons/fa';

const initialStudents = [
  { id: 1, name: 'John Doe', enrollmentNumber: 'ENR001', email: 'john@example.com', course: 'Computer Science', semester: '3', gender: 'Male', attendance: 85 },
  { id: 2, name: 'Jane Smith', enrollmentNumber: 'ENR002', email: 'jane@example.com', course: 'Computer Science', semester: '5', gender: 'Female', attendance: 72 },
  { id: 3, name: 'Bob Johnson', enrollmentNumber: 'ENR003', email: 'bob@example.com', course: 'Mathematics', semester: '2', gender: 'Male', attendance: 55 }
];

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('college_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  useEffect(() => {
    localStorage.setItem('college_students', JSON.stringify(students));
  }, [students]);
  
  const student = students.find(s => s.id === parseInt(id));

  if (!student) {
    return (
      <div className="page">
        <h1 className="page-title">Student Not Found</h1>
        <Link to="/students" className="btn btn-primary">Back to Students</Link>
      </div>
    );
  }

  const getAttendanceStatus = (attendance) => {
    if (attendance >= 75) {
      return {
        status: 'Eligible',
        class: 'eligible',
        message: 'Good attendance! You are eligible for exams.',
        icon: <FaCheckCircle />
      };
    } else if (attendance >= 60) {
      return {
        status: 'Warning',
        class: 'warning',
        message: 'Your attendance is below 75%. Please improve your attendance.',
        icon: <FaExclamationTriangle />
      };
    } else {
      return {
        status: 'Detained',
        class: 'detained',
        message: 'Your attendance is critically low. You have been detained.',
        icon: <FaBan />
      };
    }
  };

  const attendanceInfo = getAttendanceStatus(student.attendance);

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} className="btn btn-secondary">← Back</button>
      
      <div className="details-container">
        <div className="details-header">
          <h1>{student.name}</h1>
          <span className={`status-badge ${attendanceInfo.class}`}>
            {attendanceInfo.icon} {attendanceInfo.status}
          </span>
        </div>

        <div className={`attendance-alert ${attendanceInfo.class}`}>
          <h3>{attendanceInfo.icon} Attendance Status: {attendanceInfo.status}</h3>
          <p>{attendanceInfo.message}</p>
          <p className="attendance-percentage">Current Attendance: {student.attendance}%</p>
        </div>

        <div className="details-card">
          <h2>Student Information</h2>
          <table className="details-table">
            <tbody>
              <tr>
                <td><strong>Enrollment Number:</strong></td>
                <td>{student.enrollmentNumber}</td>
              </tr>
              <tr>
                <td><strong>Email:</strong></td>
                <td>{student.email}</td>
              </tr>
              <tr>
                <td><strong>Course:</strong></td>
                <td>{student.course}</td>
              </tr>
              <tr>
                <td><strong>Semester:</strong></td>
                <td>{student.semester}</td>
              </tr>
              <tr>
                <td><strong>Gender:</strong></td>
                <td>{student.gender}</td>
              </tr>
              <tr>
                <td><strong>Attendance:</strong></td>
                <td>
                  <div className="attendance-bar-container">
                    <div 
                      className={`attendance-bar ${attendanceInfo.class}`}
                      style={{ width: `${student.attendance}%` }}
                    ></div>
                    <span>{student.attendance}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Link to="/students" className="btn btn-primary">Back to Students List</Link>
      </div>
    </div>
  );
};

export default StudentDetails;
