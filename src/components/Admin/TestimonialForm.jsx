import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestimonialForm({ initial = {}, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    name: '', location: '', quote: '', rating: 5, order: 0
  });
  const [file, setFile]         = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    setForm({
      name:     initial.name     || '',
      location: initial.location || '',
      quote:    initial.quote    || '',
      rating:   initial.rating   ?? 5,
      order:    initial.order    ?? 0
    });
    setPreviewUrl(initial.avatarUrl || '');
    setFile(null);
  }, [initial]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name==='rating'||name==='order' ? Number(value) : value
    }));
  };

  const handleFile = e => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreviewUrl(URL.createObjectURL(f));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append('name', form.name);
    data.append('location', form.location);
    data.append('quote', form.quote);
    data.append('rating', form.rating);
    data.append('order', form.order);
    if (file) data.append('avatar', file);

    try {
      const url    = initial._id
        ? `/api/admin/testimonials/${initial._id}`
        : '/api/admin/testimonials';
      const method = initial._id ? 'put' : 'post';
      await axios[method](url, data, {
        headers: {'Content-Type':'multipart/form-data'}
      });
      onSuccess();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
      {previewUrl && (
        <div style={{ textAlign: 'center', margin: '12px 0' }}>
          <img
            src={previewUrl}
            alt=""
            style={{
              width: 100, height: 100, objectFit: 'cover',
              borderRadius: '50%', border: '4px solid #ff7a00'
            }}
          />
        </div>
      )}

      <div style={{ marginBottom: 12 }}>
        <label>Name *</label><br/>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required disabled={saving}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Location</label><br/>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          disabled={saving}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Quote *</label><br/>
        <textarea
          name="quote"
          value={form.quote}
          onChange={handleChange}
          rows={3}
          required disabled={saving}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
        <div>
          <label>Rating</label><br/>
          <input
            type="number" name="rating" value={form.rating}
            onChange={handleChange} min={0} max={5}
            disabled={saving} style={{ width: 100 }}
          />
        </div>
        <div>
          <label>Order</label><br/>
          <input
            type="number" name="order" value={form.order}
            onChange={handleChange}
            disabled={saving} style={{ width: 100 }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>Avatar {initial._id ? '(replace)' : '*'}</label><br/>
        <input
          type="file" name="avatar" accept="image/*"
          onChange={handleFile}
          required={!initial._id} disabled={saving}
        />
      </div>

      <div style={{ textAlign: 'right' }}>
        <button type="submit" disabled={saving} style={{ marginRight: 8 }}>
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}
