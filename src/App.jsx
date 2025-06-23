import React, { useState } from 'react';

const Section = ({ title, children }) => (
  <section>
    <h2 style={{ color: '#4338ca' }}>{title}</h2>
    <div>{children}</div>
  </section>
);

export default function App() {
  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState('/profile.jpg');
  const [summary, setSummary] = useState('Motivated Cloud & DevOps Engineer...');
  const [skills, setSkills] = useState(['AWS', 'Terraform', 'Docker']);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <header style={{
        background: 'linear-gradient(to right, #6366f1, #818cf8)',
        padding: '2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <img src={profilePic} alt="Profile" style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          objectFit: 'cover',
          marginBottom: '1rem',
          border: '4px solid white'
        }} />
        {editMode && <input type="file" accept="image/*" onChange={handlePhotoChange} />}
        <h1 style={{ margin: 0 }}>Pradeep Reddy Gunna</h1>
        <p>Cloud & DevOps Engineer</p>
      </header>

      <Section title="Summary">
        {editMode ? (
          <textarea value={summary} onChange={e => setSummary(e.target.value)} />
        ) : (
          <p>{summary}</p>
        )}
      </Section>

      <Section title="Skills">
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>
              {skill}
              {editMode && (
                <button onClick={() => handleRemoveSkill(index)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
        {editMode && (
          <>
            <input
              placeholder="Add new skill"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
            />
            <button onClick={handleAddSkill}>Add Skill</button>
          </>
        )}
      </Section>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button onClick={() => setEditMode(prev => !prev)}>
          {editMode ? 'Save & Exit Edit Mode' : 'Edit My Resume'}
        </button>
      </div>
    </div>
  );
}