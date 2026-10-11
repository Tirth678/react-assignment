import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, initialData, courses, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    enrollmentNumber: '',
    email: '',
    course: '',
    semester: '',
    gender: '',
    attendance: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: initialData?.id || Date.now() });
    if (!initialData) {
      setFormData({
        name: '',
        enrollmentNumber: '',
        email: '',
        course: '',
        semester: '',
        gender: '',
        attendance: ''
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Student Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="enrollmentNumber">Enrollment Number</label>
        <input
          type="text"
          id="enrollmentNumber"
          name="enrollmentNumber"
          value={formData.enrollmentNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="course">Course</label>
        <select
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.name}>{course.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="semester">Semester</label>
        <select
          id="semester"
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          required
        >
          <option value="">Select Semester</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="attendance">Attendance (%)</label>
        <input
          type="number"
          id="attendance"
          name="attendance"
          value={formData.attendance}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Student' : 'Add Student'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;
