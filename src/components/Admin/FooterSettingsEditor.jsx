// src/components/Admin/FooterSettingsEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Simple modal wrapper
function Modal({ children, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 1000
    }} onClick={onClose}>
      <div
        style={{ background: '#fff', padding: 20, borderRadius: 6, minWidth: 300 }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default function FooterSettingsEditor() {
  const initial = {
    description: '',
    contact: { address: '', phone: '', email: '' },
    shortLinks: [],
    helpLinks: [],
    followLinks: [],
    bottomLinks: [],
  };

  const [data, setData]      = useState(initial);
  const [loading, setLoading]= useState(true);
  const [saving, setSaving]  = useState(false);
  const [modal, setModal]    = useState(null);
  // modal = { array: 'shortLinks', idx: 0 } or null

  useEffect(() => {
    axios.get('/api/admin/footer-settings')
      .then(res => setData(res.data.settings || initial))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // helper updaters
  const setField = (field, val) =>
    setData(d => ({ ...d, [field]: val }));
  const setContact = (field, val) =>
    setData(d => ({ ...d, contact: { ...d.contact, [field]: val } }));
  const setArrayItem = (arr, idx, key, val) =>
    setData(d => ({
      ...d,
      [arr]: d[arr].map((it,i) => i===idx ? { ...it, [key]: val } : it)
    }));
  const addItem = arr =>
    setData(d => ({ ...d, [arr]: [...d[arr], arr==='followLinks'
      ? { iconClass:'', url:'' }
      : { label:'', url:'' }
    ] }));
  const removeItem = (arr, idx) =>
    setData(d => ({ ...d, [arr]: d[arr].filter((_,i)=>i!==idx) }));

  const openModal = (arrayName, idx) =>
    setModal({ arrayName, idx });
  const closeModal = () =>
    setModal(null);

  const saveModal = () => {
    closeModal();
  };

  const handleSaveAll = () => {
    setSaving(true);
    axios.post('/api/admin/footer-settings', data)
      .then(() => alert('Saved!'))
      .finally(() => setSaving(false));
  };

  if (loading) return <p>Loading…</p>;

  const renderCards = (arrayName, fields) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {data[arrayName].map((item, idx) => (
        <div key={idx} style={{
          border: '1px solid #ccc', borderRadius: 4,
          padding: 12, width: 200, position: 'relative'
        }}>
          <button
            onClick={() => removeItem(arrayName, idx)}
            style={{
              position: 'absolute', top: 4, right: 4,
              border: 'none', background: 'transparent', cursor: 'pointer'
            }}>
            ×
          </button>
          {fields.map(f => (
            <div key={f.key} style={{ marginBottom: 6 }}>
              <strong style={{ fontSize: 12 }}>{f.label}:</strong><br/>
              <span style={{ fontSize: 14, color: '#333' }}>{item[f.key]||<em>—</em>}</span>
            </div>
          ))}
          <button onClick={() => openModal(arrayName, idx)} className="btn btn-sm btn-outline-primary">
            Edit
          </button>
        </div>
      ))}
      <button onClick={() => addItem(arrayName)} className="btn btn-sm btn-secondary">
        + Add
      </button>
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Footer Settings</h2>

      <div style={{ marginBottom: 16 }}>
        <label><strong>Description</strong></label><br/>
        <textarea
          value={data.description}
          onChange={e => setField('description', e.target.value)}
          rows={2}
          style={{ width: '100%' }}
        />
      </div>

      <h3>Contact</h3>
      {['address','phone','email'].map(f => (
        <div key={f} style={{ marginBottom: 8 }}>
          <input
            value={data.contact[f]}
            onChange={e => setContact(f, e.target.value)}
            placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
            style={{ width:'100%' }}
          />
        </div>
      ))}

      <h3>Short Links</h3>
      {renderCards('shortLinks', [{ key:'label', label:'Label' }, { key:'url', label:'URL' }])}

      <h3>Help Links</h3>
      {renderCards('helpLinks', [{ key:'label', label:'Label' }, { key:'url', label:'URL' }])}

      <h3>Follow Links</h3>
      {renderCards('followLinks', [{ key:'iconClass', label:'Icon' }, { key:'url', label:'URL' }])}

      <h3>Bottom Links</h3>
      {renderCards('bottomLinks', [{ key:'label', label:'Label' }, { key:'url', label:'URL' }])}

      <div style={{ marginTop: 20 }}>
        <button onClick={handleSaveAll} disabled={saving} className="btn btn-primary">
          {saving ? 'Saving…' : 'Save All'}
        </button>
      </div>

      {modal && (
        <Modal onClose={closeModal}>
          <h4>Edit {modal.arrayName.replace(/Links$/,' Link')}</h4>
          {Object.entries(data[modal.arrayName][modal.idx]).map(([key, val]) => (
            <div key={key} style={{ marginBottom: 12 }}>
              <label style={{ display:'block', fontSize:14 }}>{key}</label>
              <input
                style={{ width:'100%' }}
                value={val}
                onChange={e => setArrayItem(modal.arrayName, modal.idx, key, e.target.value)}
              />
            </div>
          ))}
          <div style={{ textAlign: 'right' }}>
            <button onClick={saveModal} className="btn btn-success btn-sm">OK</button>{' '}
            <button onClick={closeModal} className="btn btn-secondary btn-sm">Cancel</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
