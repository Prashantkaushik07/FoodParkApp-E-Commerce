// src/components/Admin/AdminMenuEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminMenuEditor() {
  const [cfg, setCfg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/admin/menu-config')
      .then(({ data }) => setCfg(data.menuConfig))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (path, value) => {
    // shallow helper: path = 'brand.src' or 'items[0].label'
    setCfg(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      path.split('.').reduce((o, key, i, arr) => {
        if (key.endsWith(']')) {
          const [arrKey, idx] = key.match(/(.+)\[(\d+)\]/).slice(1);
          if (i === arr.length - 1) o[arrKey][+idx] = value;
          return o[arrKey][+idx];
        } else {
          if (i === arr.length - 1) o[key] = value;
          return o[key];
        }
      }, copy);
      return copy;
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/admin/menu-config', cfg);
    alert('Menu config saved');
  };

  if (loading) return <p>Loading…</p>;
  if (!cfg) return <p>Error loading configuration.</p>;

  return (
    <div className="container py-4">
      <h2>Edit Navbar & Cart</h2>
      <form onSubmit={onSubmit}>
        <h4>Brand</h4>
        <div className="row g-3 mb-3">
          <div className="col">
            <label>Logo src</label>
            <input
              className="form-control"
              value={cfg.brand.src}
              onChange={e => updateField('brand.src', e.target.value)}
            />
          </div>
          <div className="col">
            <label>Alt text</label>
            <input
              className="form-control"
              value={cfg.brand.alt}
              onChange={e => updateField('brand.alt', e.target.value)}
            />
          </div>
        </div>

        <h4>Menu Items</h4>
        {cfg.items.map((it, i) => (
          <div key={i} className="border rounded p-3 mb-3">
            <label>Label</label>
            <input
              className="form-control mb-2"
              value={it.label}
              onChange={e => updateField(`items[${i}].label`, e.target.value)}
            />
            <label>URL (to)</label>
            <input
              className="form-control mb-2"
              value={it.to}
              onChange={e => updateField(`items[${i}].to`, e.target.value)}
            />

            {/* Dropdown if any */}
            <h6>Dropdown</h6>
            {it.dropdown?.map((dd, j) => (
              <div key={j} className="ps-3 mb-2">
                <input
                  className="form-control mb-1"
                  value={dd.label}
                  onChange={e => updateField(`items[${i}].dropdown[${j}].label`, e.target.value)}
                  placeholder="label"
                />
                <input
                  className="form-control"
                  value={dd.to}
                  onChange={e => updateField(`items[${i}].dropdown[${j}].to`, e.target.value)}
                  placeholder="to"
                />
              </div>
            ))}
          </div>
        ))}

        <h4>Search & Cart</h4>
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={cfg.searchEnabled}
            onChange={e => updateField('searchEnabled', e.target.checked)}
          />
          <label className="form-check-label">Enable search icon</label>
        </div>
        <div className="mb-3">
          <label>Cart icon count</label>
          <input
            type="number"
            className="form-control"
            value={cfg.cartIconCount}
            onChange={e => updateField('cartIconCount', e.target.value)}
          />
        </div>

        <h4>Reservation Button</h4>
        <div className="row g-3 mb-3">
          <div className="col">
            <label>Button text</label>
            <input
              className="form-control"
              value={cfg.reservation.text}
              onChange={e => updateField('reservation.text', e.target.value)}
            />
          </div>
          <div className="col">
            <label>Modal backdrop</label>
            <input
              className="form-control"
              value={cfg.reservation.modalOptions.backdrop}
              onChange={e => updateField('reservation.modalOptions.backdrop', e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Save All</button>
      </form>
    </div>
  );
}
