import React, { useState, useEffect, useMemo } from 'react';
import CourseCard from '../components/CourseCard';
import CourseForm from '../components/CourseForm';
import Alert from '../components/Alert';

const initialCourses = [
  { id: 1, name: 'Computer Science', code: 'CS101', credits: 4, department: 'Engineering', description: 'Introduction to computer science and programming' },
  { id: 2, name: 'Mathematics', code: 'MATH101', credits: 3, department: 'Science', description: 'Calculus and linear algebra fundamentals' },
  { id: 3, name: 'Physics', code: 'PHY101', credits: 4, department: 'Science', description: 'Classical mechanics and thermodynamics' }
];

const Courses = () => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('college_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    localStorage.setItem('college_courses', JSON.stringify(courses));
  }, [courses]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), 3000);
  };

  const handleAddCourse = (course) => {
    setCourses(prev => [...prev, course]);
    setShowForm(false);
    showAlert('success', 'Course added successfully!');
  };

  const handleEditCourse = (course) => {
    setCourses(prev => prev.map(c => c.id === course.id ? course : c));
    setEditingCourse(null);
    setShowForm(false);
    showAlert('success', 'Course updated successfully!');
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(c => c.id !== id));
      showAlert('success', 'Course deleted successfully!');
    }
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = 
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = filterDepartment === '' || course.department === filterDepartment;
      
      return matchesSearch && matchesDepartment;
    });
  }, [courses, searchTerm, filterDepartment]);

  const departments = useMemo(() => {
    return [...new Set(courses.map(course => course.department))];
  }, [courses]);

  return (
    <div className="page">
      <h1 className="page-title">Course Management</h1>
      
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
            setEditingCourse(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Add Course'}
        </button>
        
        <input
          type="text"
          placeholder="Search courses..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="filter-select"
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="form-container">
          <CourseForm
            onSubmit={editingCourse ? handleEditCourse : handleAddCourse}
            initialData={editingCourse}
            onCancel={() => {
              setShowForm(false);
              setEditingCourse(null);
            }}
          />
        </div>
      )}

      <div className="cards-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={handleDeleteCourse}
              onEdit={handleEditClick}
            />
          ))
        ) : (
          <p className="no-data">No courses found</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
