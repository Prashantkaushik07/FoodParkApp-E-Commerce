// src/components/Admin/HeaderEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HeaderEditor() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing settings
  useEffect(() => {
    axios.get('/api/admin/header-settings')
      .then(({ data }) => setForm(data.settings || data))
      .catch(err => {
        console.error(err);
        setError('Failed to load settings');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!form) return <p>No settings found.</p>;

  // Deep-update helper
  const update = (path, value) => {
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      path.split('.').reduce((o, k, i, arr) => {
        if (i === arr.length - 1) o[k] = value;
        return o[k];
      }, copy);
      return copy;
    });
  };

  const changeArray = (key, i, field, val) => {
    const arr = [...form[key]];
    arr[i] = { ...arr[i], [field]: val };
    setForm(f => ({ ...f, [key]: arr }));
  };

  const addArray = (key, template) =>
    setForm(f => ({ ...f, [key]: [...(f[key] || []), template] }));

  const removeArray = (key, i) =>
    setForm(f => ({ ...f, [key]: f[key].filter((_, idx) => idx !== i) }));

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/admin/header-settings', form);
      setForm(res.data.settings || res.data);
      alert('Saved!');
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  return (
    <div className="container py-4">
      <h2>Edit Header & Navbar</h2>
      <form onSubmit={onSubmit} className="row gx-3 gy-4">

        {/* Topbar */}
        <h4>Topbar</h4>
        {['email', 'phone'].map((field, idx) => (
          <div key={idx} className="col-md-6">
            <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              className="form-control"
              value={form.topbar?.[field] || ''}
              onChange={e => update(`topbar.${field}`, e.target.value)}
              required
            />
          </div>
        ))}

        {/* Social Icons */}
        <h4 className="mt-4">Social Icons</h4>
        {(form.social || []).map((s, i) => (
          <div key={i} className="col-12 border p-3 mb-2">
            <div className="row">
              <div className="col-md-3">
                <label>Name</label>
                <input
                  className="form-control"
                  value={s.name || ''}
                  onChange={e => changeArray('social', i, 'name', e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label>Icon Class</label>
                <input
                  className="form-control"
                  value={s.iconClass || ''}
                  onChange={e => changeArray('social', i, 'iconClass', e.target.value)}
                  placeholder="e.g., fab fa-facebook"
                />
              </div>
              <div className="col-md-4">
                <label>URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={s.url || ''}
                  onChange={e => changeArray('social', i, 'url', e.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => removeArray('social', i)}
                >Remove</button>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => addArray('social', { name: '', iconClass: '', url: '' })}
          >+ Add Social Icon</button>
        </div>

        {/* Main Menu */}
        <h4 className="mt-4">Main Menu Links</h4>
        {(form.menuItems || []).map((m, i) => (
          <div key={i} className="col-12 border p-3 mb-3">
            <div className="row">
              <div className="col-md-5">
                <label>Label</label>
                <input
                  className="form-control"
                  value={m.label || ''}
                  onChange={e => changeArray('menuItems', i, 'label', e.target.value)}
                  placeholder="e.g., Home or Pages"
                />
              </div>
              <div className="col-md-5">
                <label>Route</label>
                <input
                  className="form-control"
                  value={m.to || ''}
                  onChange={e => changeArray('menuItems', i, 'to', e.target.value)}
                  placeholder="/about or leave blank for dropdown"
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => removeArray('menuItems', i)}
                >Remove</button>
              </div>
            </div>

            {/* Dropdown (Children) */}
            <div className="mt-3">
              <h6>Dropdown Items (optional)</h6>
              {(m.children || []).map((child, ci) => (
                <div key={ci} className="row mb-2">
                  <div className="col-md-5">
                    <label>Label</label>
                    <input
                      className="form-control"
                      value={child.label || ''}
                      onChange={e => {
                        const updatedChildren = [...(m.children || [])];
                        updatedChildren[ci].label = e.target.value;
                        changeArray('menuItems', i, 'children', updatedChildren);
                      }}
                      placeholder="e.g., Blog Details"
                    />
                  </div>
                  <div className="col-md-5">
                    <label>Link</label>
                    <input
                      className="form-control"
                      value={child.to || ''}
                      onChange={e => {
                        const updatedChildren = [...(m.children || [])];
                        updatedChildren[ci].to = e.target.value;
                        changeArray('menuItems', i, 'children', updatedChildren);
                      }}
                      placeholder="/blog-details"
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-danger w-100"
                      onClick={() => {
                        const updatedChildren = [...(m.children || [])];
                        updatedChildren.splice(ci, 1);
                        changeArray('menuItems', i, 'children', updatedChildren);
                      }}
                    >Remove</button>
                  </div>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm mt-2"
                  onClick={() => {
                    const updatedChildren = [...(m.children || []), { label: '', to: '' }];
                    changeArray('menuItems', i, 'children', updatedChildren);
                  }}
                >+ Add Dropdown Item</button>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => addArray('menuItems', { label: '', to: '', children: [] })}
          >+ Add Nav Link</button>
        </div>


        {/* Search Placeholder */}
        <h4 className="mt-4">Search</h4>
        <div className="col-md-12">
          <label>Placeholder</label>
          <input
            className="form-control"
            value={form.searchPlaceholder || ''}
            onChange={e => setForm(f => ({ ...f, searchPlaceholder: e.target.value }))}
            placeholder="Search…"
          />
        </div>

        {/* Cart & User */}
        <h4 className="mt-4">Cart & User</h4>
        <div className="col-md-6">
          <label>Cart Badge Count</label>
          <input
            type="number"
            className="form-control"
            value={form.cartCount || 0}
            onChange={e => setForm(f => ({ ...f, cartCount: +e.target.value }))}
          />
        </div>
        <div className="col-md-6">
          <label>User Dashboard URL</label>
          <input
            type="text"
            className="form-control"
            value={form.userLink || ''}
            onChange={e => setForm(f => ({ ...f, userLink: e.target.value }))}
          />
        </div>

        {/* Reservation */}
        <h4 className="mt-4">Reservation Button</h4>
        <div className="col-md-6">
          <label>Text</label>
          <input
            className="form-control"
            value={form.reservation?.text || ''}
            onChange={e => update('reservation.text', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label>Modal Trigger or Link</label>
          <input
            className="form-control"
            value={form.reservation?.url || ''}
            onChange={e => update('reservation.url', e.target.value)}
            placeholder="e.g., #staticBackdrop"
          />
        </div>

        {/* Save */}
        <div className="col-12 text-end mt-4">
          <button type="submit" className="btn btn-primary px-4">Save All</button>
        </div>
      </form>
    </div>
  );
}
