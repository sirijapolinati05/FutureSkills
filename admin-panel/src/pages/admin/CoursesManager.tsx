import React, { useState, useEffect } from 'react';
import { localDb, Course } from '../../db/localDb';
import { Plus, BookOpen, Trash2 } from 'lucide-react';

export const CoursesManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Design');
  const [duration, setDuration] = useState('');
  const [lessonsCount, setLessonsCount] = useState(10);
  const [requiredPackage, setRequiredPackage] = useState('Classic Package');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60');

  const fetchCourses = () => {
    setCourses(localDb.getCourses());
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !duration || !description) {
      alert('Please fill out all required fields.');
      return;
    }

    const newCourse: Course = {
      id: 'course-' + Math.random().toString(36).substr(2, 9),
      title,
      category,
      thumbnail,
      duration,
      lessonsCount: Number(lessonsCount),
      requiredPackage,
      description,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    };

    const updatedCourses = [...courses, newCourse];
    localDb.saveCourses(updatedCourses);
    fetchCourses();
    
    // Reset Form
    setTitle('');
    setDuration('');
    setDescription('');
    alert('New Course Added Successfully to Catalog!');
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to remove this course from the catalog?')) {
      const updated = courses.filter(c => c.id !== courseId);
      localDb.saveCourses(updated);
      fetchCourses();
    }
  };

  const packages = [
    'Classic Package',
    'Heroic Package',
    'Prime Package',
    'Crystal Package',
    'Platinum Package',
    'Premium Package',
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="courses-grid">
      
      {/* List Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>Courses Manager</h2>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>View, manage and delete courses from the e-learning library.</p>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem' }}>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Course Info</th>
                  <th>Category</th>
                  <th>Required Tier</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{course.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{course.lessonsCount} lessons | {course.duration}</div>
                    </td>
                    <td>{course.category}</td>
                    <td>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7c3aed' }}>
                        {course.requiredPackage}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="admin-btn admin-btn-danger"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontFamily: 'Outfit' }}>Add New Course</h3>

        <form onSubmit={handleAddCourse} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="admin-form-group">
            <label className="admin-form-label">Course Title *</label>
            <input
              type="text"
              placeholder="e.g. Masterclass Freelance Designing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="admin-form-input"
            >
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Development">Development</option>
              <option value="Editing">Editing</option>
              <option value="Business">Business</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Duration *</label>
            <input
              type="text"
              placeholder="e.g. 10h 30m"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="admin-form-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Number of Lessons</label>
            <input
              type="number"
              value={lessonsCount}
              onChange={(e) => setLessonsCount(Number(e.target.value))}
              className="admin-form-input"
              min={1}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Required Package Tier</label>
            <select
              value={requiredPackage}
              onChange={(e) => setRequiredPackage(e.target.value)}
              className="admin-form-input"
            >
              {packages.map((pkg) => (
                <option key={pkg} value={pkg}>{pkg}</option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Course Description *</label>
            <textarea
              placeholder="Course description and learnings summary..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="admin-form-input"
              style={{ minHeight: '80px', resize: 'vertical' }}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Thumbnail URL</label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="admin-form-input"
            />
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.625rem', display: 'flex', justifyContent: 'center' }}>
            <Plus size={16} />
            Publish Course
          </button>
        </form>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .courses-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
