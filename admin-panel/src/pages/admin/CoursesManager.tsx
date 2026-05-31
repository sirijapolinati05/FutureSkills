import React, { useState, useEffect } from 'react';
import { localDb, Course } from '../../db/localDb';

const categoryOptions = ['Design', 'Marketing', 'Development', 'Business', 'Sales'];
const imageOptions = ['video_editing', 'facebook_ads', 'google_adsense', 'seo', 'email_marketing', 'copyright_mastery'];

export const CoursesManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Design');
  const [duration, setDuration] = useState('');
  const [lessonsCount, setLessonsCount] = useState(10);
  const [requiredPackage, setRequiredPackage] = useState('Classic Package');
  const [description, setDescription] = useState('');
  const [imageKey, setImageKey] = useState('video_editing');

  const fetchCourses = () => setCourses(localDb.getCourses());
  const packages = localDb.getPackages().map((pkg) => pkg.name);

  useEffect(() => { fetchCourses(); }, []);

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: 'course-' + Math.random().toString(36).substr(2, 9),
      title,
      category,
      thumbnail: '',
      duration,
      lessonsCount: Number(lessonsCount),
      requiredPackage,
      description,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      imageKey,
    };

    localDb.saveCourses([...courses, newCourse]);
    setTitle('');
    setDuration('');
    setDescription('');
    fetchCourses();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="courses-grid">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontFamily: 'Outfit', color: '#0f172a' }}>Courses Manager</h2>
          <p style={{ fontSize: '0.9rem', color: '#475569' }}>My Courses section lo render ayye cards ni ikkada manage cheyyachu.</p>
        </div>

        <div className="admin-card" style={{ background: 'white', padding: '1.5rem' }}>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead><tr><th>Course Info</th><th>Category</th><th>Required Tier</th><th>Asset</th><th /></tr></thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td><div style={{ fontWeight: 600 }}>{course.title}</div><div style={{ fontSize: '0.75rem', color: '#64748b' }}>{course.lessonsCount} lessons | {course.duration}</div></td>
                    <td>{course.category}</td>
                    <td>{course.requiredPackage}</td>
                    <td>{course.imageKey || 'thumbnail'}</td>
                    <td style={{ textAlign: 'right' }}><button className="admin-btn admin-btn-danger" onClick={() => { localDb.saveCourses(courses.filter((item) => item.id !== course.id)); fetchCourses(); }}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <form onSubmit={handleAddCourse} className="admin-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Add New Course</h3>
        <input className="admin-form-input" placeholder="Course title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <select className="admin-form-input" value={category} onChange={(e) => setCategory(e.target.value)}>{categoryOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>
        <input className="admin-form-input" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <input className="admin-form-input" type="number" value={lessonsCount} onChange={(e) => setLessonsCount(Number(e.target.value))} min={1} />
        <select className="admin-form-input" value={requiredPackage} onChange={(e) => setRequiredPackage(e.target.value)}>{packages.map((pkg) => <option key={pkg} value={pkg}>{pkg}</option>)}</select>
        <select className="admin-form-input" value={imageKey} onChange={(e) => setImageKey(e.target.value)}>{imageOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>
        <textarea className="admin-form-input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ minHeight: '90px' }} required />
        <button type="submit" className="admin-btn admin-btn-primary">Publish Course</button>
      </form>

      <style>{`@media (max-width: 900px) { .courses-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
};
