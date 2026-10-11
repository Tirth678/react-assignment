import React, { useState, useEffect, useMemo } from 'react';
import StudentCard from '../components/StudentCard';
import StudentForm from '../components/StudentForm';
import Alert from '../components/Alert';

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

const Students = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('college_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('college_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    localStorage.setItem('college_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('college_courses', JSON.stringify(courses));
  }, [courses]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  const handleAddStudent = (student) => {
    setStudents(prev => [...prev, student]);
    setShowForm(false);
    showAlert('success', 'Student added successfully!');
  };

  const handleEditStudent = (student) => {
    setStudents(prev => prev.map(s => s.id === student.id ? student : s));
    setEditingStudent(null);
    setShowForm(false);
    showAlert('success', 'Student updated successfully!');
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
      showAlert('success', 'Student deleted successfully!');
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.enrollmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCourse = filterCourse === '' || student.course === filterCourse;
      
      return matchesSearch && matchesCourse;
    });
  }, [students, searchTerm, filterCourse]);

  return (
    <div className="page">
      <h1 className="page-title">Student Management</h1>
      
      {alert.message && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ type: '', message: '' })}
        />
      )}

      <div className="toolbar">
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setEditingStudent(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Add Student'}
        </button>
        
        <input
          type="text"
          placeholder="Search students..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="filter-select"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.name}>{course.name}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="form-container">
          <StudentForm
            onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
            initialData={editingStudent}
            courses={courses}
            onCancel={() => {
              setShowForm(false);
              setEditingStudent(null);
            }}
          />
        </div>
      )}

      <div className="cards-grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onDelete={handleDeleteStudent}
              onEdit={handleEditClick}
            />
          ))
        ) : (
          <p className="no-data">No students found</p>
        )}
      </div>
    </div>
  );
};

export default Students;
