// src/admin/TeamSectionForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TeamSectionForm() {
  const [section, setSection] = useState({ preTitle:'', title:'', description:'' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    axios.get('/api/team-section')
      .then(res => setSection(res.data))
      .catch(() => setFeedback('Error loading'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setSection({ ...section, [e.target.name]: e.target.value });
    setFeedback('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await axios.put('/api/admin/team-section', section);
      setSection(res.data);         // reflect what server saved
      setFeedback('Saved successfully');
    } catch {
      setFeedback('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:600,padding:20}}>
      {feedback && <p>{feedback}</p>}

      <label>Pre-Title</label><br/>
      <input
        name="preTitle"
        value={section.preTitle}
        onChange={handleChange}
        disabled={saving}
        style={{width:'100%',marginBottom:12}}
      />

      <label>Main Title</label><br/>
      <input
        name="title"
        value={section.title}
        onChange={handleChange}
        disabled={saving}
        style={{width:'100%',marginBottom:12}}
      />

      <label>Description</label><br/>
      <textarea
        name="description"
        value={section.description}
        onChange={handleChange}
        disabled={saving}
        rows={3}
        style={{width:'100%',marginBottom:12}}
      />

      <button type="submit" disabled={saving}>
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  );
}
