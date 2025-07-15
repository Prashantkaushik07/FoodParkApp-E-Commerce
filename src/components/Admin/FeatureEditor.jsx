// src/components/Admin/FeatureEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function FeatureEditor() {
  const [form, setForm] = useState({
    small: '',
    title: '',
    subTitle: '',
    cards: [
      { icon: '', title: '', desc: '' },
      { icon: '', title: '', desc: '' },
      { icon: '', title: '', desc: '' },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load existing feature config
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/features')
      .then(({ data }) => {
        if (data.features && data.features.length) {
          setForm(data.features[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching features', err);
        setError('Could not load configuration.');
        setLoading(false);
      });
  }, []);

  const onChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const onCardChange = (idx, field, value) => {
    setForm(f => {
      const cards = [...f.cards];
      cards[idx] = { ...cards[idx], [field]: value };
      return { ...f, cards };
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      if (form._id) {
        await axios.put(`http://localhost:5000/api/admin/features/${form._id}`, form);
      } else {
        await axios.post('http://localhost:5000/api/admin/features', form);
      }
      alert('Features updated successfully');
    } catch (err) {
      console.error('Error saving features', err);
      alert('Failed to save configuration');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container py-4">
      <h2>Edit “Why Choose Us” Section</h2>
      <form onSubmit={onSubmit} className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Small Heading</label>
          <input
            name="small"
            value={form.small}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Main Title</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Sub Title</label>
          <input
            name="subTitle"
            value={form.subTitle}
            onChange={onChange}
            className="form-control"
          />
        </div>

        <h3 className="mt-4">Feature Cards</h3>
        {form.cards.map((card, idx) => (
          <div key={idx} className="col-12 border p-3 rounded mb-3">
            <h5>Card {idx + 1}</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Icon Class</label>
                <input
                  value={card.icon}
                  onChange={e => onCardChange(idx, 'icon', e.target.value)}
                  className="form-control"
                  placeholder="e.g. fas fa-percent"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Card Title</label>
                <input
                  value={card.title}
                  onChange={e => onCardChange(idx, 'title', e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Description</label>
                <input
                  value={card.desc}
                  onChange={e => onCardChange(idx, 'desc', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
