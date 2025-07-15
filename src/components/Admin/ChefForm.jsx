// src/admin/ChefForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChefForm({ initial = {}, onSuccess, onCancel }) {
  // form fields
  const [name, setName]         = useState('');
  const [position, setPosition] = useState('');
  const [order, setOrder]       = useState(0);
  const [socials, setSocials]   = useState([]);
  const [file, setFile]         = useState(null);

  // preview & feedback
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError]           = useState('');
  const [submitting, setSubmitting] = useState(false);

  // when `initial` changes (i.e. on edit), populate fields
  useEffect(() => {
    setName(initial.name || '');
    setPosition(initial.position || '');
    setOrder(initial.order ?? 0);
    setSocials(initial.socials || []);
    setPreviewUrl(initial.imageUrl || '');
    setFile(null);
    setError('');
  }, [initial]);

  const handleSocialChange = (idx, field, value) => {
    const copy = [...socials];
    copy[idx] = { ...copy[idx], [field]: value };
    setSocials(copy);
  };

  const addSocial = () => {
    setSocials([...socials, { platform: '', url: '' }]);
  };

  const removeSocial = idx => {
    setSocials(socials.filter((_, i) => i !== idx));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!name.trim()) return setError('Name is required');
    setSubmitting(true);

    try {
      const form = new FormData();
      form.append('name', name);
      form.append('position', position);
      form.append('order', order);
      form.append('socials', JSON.stringify(socials));
      if (file) form.append('image', file);

      const url    = initial._id
        ? `/api/admin/chefs/${initial._id}`
        : '/api/admin/chefs';
      const method = initial._id ? 'put' : 'post';

      await axios[method](url, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onSuccess();
    } catch (err) {
      console.error(err);
      setError('Failed to save, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = e => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    // preview
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(f);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

      <div>
        <label>Name *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={submitting}
          required
        />
      </div>

      <div>
        <label>Position</label>
        <input
          type="text"
          value={position}
          onChange={e => setPosition(e.target.value)}
          disabled={submitting}
        />
      </div>

      <div>
        <label>Display Order</label>
        <input
          type="number"
          value={order}
          onChange={e => setOrder(parseInt(e.target.value, 10) || 0)}
          disabled={submitting}
        />
      </div>

      <div>
        <label>Photo {initial._id ? '(replace)' : '*'}</label>
        {previewUrl && (
          <div style={{ marginBottom: 8 }}>
            <img
              src={previewUrl}
              alt="preview"
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={submitting}
          required={!initial._id}
        />
      </div>

      <div>
        <label>Social Links</label>
        {socials.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <input
              type="text"
              placeholder="Platform (e.g. facebook)"
              value={s.platform}
              onChange={e => handleSocialChange(i, 'platform', e.target.value)}
              disabled={submitting}
            />
            <input
              type="url"
              placeholder="URL"
              value={s.url}
              onChange={e => handleSocialChange(i, 'url', e.target.value)}
              disabled={submitting}
            />
            <button type="button" onClick={() => removeSocial(i)} disabled={submitting}>
              &times;
            </button>
          </div>
        ))}
        <button type="button" onClick={addSocial} disabled={submitting}>
          + Add Social
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} disabled={submitting} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
