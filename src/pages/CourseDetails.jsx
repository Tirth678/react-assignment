import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const initialCourses = [
  { id: 1, name: 'Computer Science', code: 'CS101', credits: 4, department: 'Engineering', description: 'Introduction to computer science and programming' },
  { id: 2, name: 'Mathematics', code: 'MATH101', credits: 3, department: 'Science', description: 'Calculus and linear algebra fundamentals' },
  { id: 3, name: 'Physics', code: 'PHY101', credits: 4, department: 'Science', description: 'Classical mechanics and thermodynamics' }
];

const initialStudents = [
  { id: 1, name: 'John Doe', enrollmentNumber: 'ENR001', email: 'john@example.com', course: 'Computer Science', semester: '3', gender: 'Male', attendance: 85 },
  { id: 2, name: 'Jane Smith', enrollmentNumber: 'ENR002', email: 'jane@example.com', course: 'Computer Science', semester: '5', gender: 'Female', attendance: 72 },
  { id: 3, name: 'Bob Johnson', enrollmentNumber: 'ENR003', email: 'bob@example.com', course: 'Mathematics', semester: '2', gender: 'Male', attendance: 55 }
];

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('college_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('college_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  useEffect(() => {
    localStorage.setItem('college_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('college_students', JSON.stringify(students));
  }, [students]);
  
  const course = courses.find(c => c.id === parseInt(id));

  if (!course) {
    return (
      <div className="page">
        <h1 className="page-title">Course Not Found</h1>
        <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
      </div>
    );
  }

  const enrolledStudents = students.filter(s => s.course === course.name);

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} className="btn btn-secondary">← Back</button>
      
      <div className="details-container">
        <div className="details-header">
          <h1>{course.name}</h1>
          <span className="status-badge">{course.code}</span>
        </div>

        <div className="details-card">
          <h2>Course Information</h2>
          <table className="details-table">
            <tbody>
              <tr>
                <td><strong>Course Code:</strong></td>
                <td>{course.code}</td>
              </tr>
              <tr>
                <td><strong>Credits:</strong></td>
                <td>{course.credits}</td>
              </tr>
              <tr>
                <td><strong>Department:</strong></td>
                <td>{course.department}</td>
              </tr>
              <tr>
                <td><strong>Description:</strong></td>
                <td>{course.description}</td>
              </tr>
              <tr>
                <td><strong>Enrolled Students:</strong></td>
                <td>{enrolledStudents.length}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="details-card">
          <h2>Enrolled Students</h2>
          {enrolledStudents.length > 0 ? (
            <table className="details-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Enrollment No.</th>
                  <th>Semester</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {enrolledStudents.map(student => (
                  <tr key={student.id}>
                    <td>
                      <Link to={`/students/${student.id}`} className="table-link">
                        {student.name}
                      </Link>
                    </td>
                    <td>{student.enrollmentNumber}</td>
                    <td>{student.semester}</td>
                    <td>{student.attendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No students enrolled in this course</p>
          )}
        </div>

        <Link to="/courses" className="btn btn-primary">Back to Courses List</Link>
      </div>
    </div>
  );
};

export default CourseDetails;
