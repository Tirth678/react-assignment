import React, { useState, useEffect } from 'react';
import DashboardCard from '../components/DashboardCard';
import { FaUserGraduate, FaBook, FaChartBar, FaExclamationTriangle } from 'react-icons/fa';

const initialStudents = [
  { id: 1, name: 'John Doe', enrollmentNumber: 'ENR001', email: 'john@example.com', course: 'Computer Science', semester: '3', gender: 'Male', attendance: 85 },
  { id: 2, name: 'Jane Smith', enrollmentNumber: 'ENR002', email: 'jane@example.com', course: 'Computer Science', semester: '5', gender: 'Female', attendance: 72 },
  { id: 3, name: 'Bob Johnson', enrollmentNumber: 'ENR003', email: 'bob@example.com', course: 'Mathematics', semester: '2', gender: 'Male', attendance: 55 }
];

const initialCourses = [
  { id: 1, name: 'Computer Science', code: 'CS101', credits: 4, department: 'Engineering', description: 'Introduction to computer science and programming' },
  { id: 2, name: 'Mathematics', code: 'MATH101', credits: 3, department: 'Science', description: 'Calculus and linear algebra fundamentals' },
  { id: 3, name: 'Physics', code: 'PHY101', credits: 4, department: 'Science', description: 'Classical mechanics and thermodynamics' }
];

const Dashboard = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('college_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('college_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  useEffect(() => {
    localStorage.setItem('college_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('college_courses', JSON.stringify(courses));
  }, [courses]);

  const totalStudents = students.length;
  const totalCourses = courses.length;
  const studentsWithLowAttendance = students.filter(s => s.attendance < 75).length;
  const averageAttendance = students.length > 0 
    ? Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)
    : 0;

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>
      <div className="dashboard-grid">
        <DashboardCard
          title="Total Students"
          value={totalStudents}
          icon={<FaUserGraduate />}
          color="#4CAF50"
        />
        <DashboardCard
          title="Total Courses"
          value={totalCourses}
          icon={<FaBook />}
          color="#2196F3"
        />
        <DashboardCard
          title="Average Attendance"
          value={`${averageAttendance}%`}
          icon={<FaChartBar />}
          color="#FF9800"
        />
        <DashboardCard
          title="Low Attendance Warnings"
          value={studentsWithLowAttendance}
          icon={<FaExclamationTriangle />}
          color="#f44336"
        />
      </div>
    </div>
  );
};

export default Dashboard;
