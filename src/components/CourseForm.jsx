import React, { useState, useEffect } from 'react';

const CourseForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    credits: '',
    department: '',
    description: ''
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
        code: '',
        credits: '',
        department: '',
        description: ''
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Course Name</label>
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
        <label htmlFor="code">Course Code</label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="credits">Credits</label>
        <input
          type="number"
          id="credits"
          name="credits"
          value={formData.credits}
          onChange={handleChange}
          min="1"
          max="10"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Update Course' : 'Add Course'}
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

export default CourseForm;
