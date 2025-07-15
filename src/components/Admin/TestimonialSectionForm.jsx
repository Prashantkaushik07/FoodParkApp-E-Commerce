import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestimonialSectionForm() {
  const [section, setSection] = useState({
    preTitle: '', title: '', description: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    axios.get('/api/testimonial-section')
      .then(res => setSection(res.data))
      .catch(() => setFeedback('Load failed'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e =>
    setSection({ ...section, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setFeedback('');
    try {
      const res = await axios.put('/api/admin/testimonial-section', section);
      setSection(res.data);
      setFeedback('Saved!');
    } catch {
      setFeedback('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div style={{ padding: 20, maxWidth: 600 }}>
      <h3>Edit Testimonial Section</h3>
      {feedback && <p style={{color: feedback==='Saved!'?'green':'red'}}>{feedback}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Pre-Title</label><br/>
          <input
            name="preTitle"
            value={section.preTitle}
            onChange={handleChange}
            disabled={saving}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Main Title</label><br/>
          <input
            name="title"
            value={section.title}
            onChange={handleChange}
            disabled={saving}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Description</label><br/>
          <textarea
            name="description"
            value={section.description}
            onChange={handleChange}
            disabled={saving}
            rows={3}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
