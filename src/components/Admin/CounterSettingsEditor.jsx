// src/components/Admin/CounterSettingsEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// list of icon classes to show in the sidebar
const AVAILABLE_ICONS = [
  'fas fa-burger-soda',
  'fal fa-hat-chef',
  'far fa-handshake',
  'far fa-trophy',
  // ...add more icon classes here
];

export default function CounterSettingsEditor() {
  const [counters, setCounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  // fetch existing settings
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/api/admin/counter-settings');
        setCounters(res.data.counters);
      } catch (err) {
        setError('Failed to load counters.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // update a single field
  const updateField = (idx, field, val) => {
    setCounters(prev =>
      prev.map((c, i) => (i === idx ? { ...c, [field]: val } : c))
    );
  };

  // add / remove counter
  const addCounter = () =>
    setCounters(prev => [...prev, { icon: '', value: '', label: '' }]);
  const removeCounter = idx =>
    setCounters(prev => prev.filter((_, i) => i !== idx));

  // save all
  const handleSave = async () => {
    for (let c of counters) {
      if (!c.icon.trim() || !c.value.trim() || !c.label.trim()) {
        return alert('All fields are required.');
      }
    }
    setSaving(true);
    try {
      await axios.post('/api/admin/counter-settings', { counters });
      alert('✅ Saved successfully!');
    } catch (err) {
      alert('❌ Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading counters…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // styles
  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 16,
  };
  const cardStyle = {
    width: 240,
    background: '#fff',
    borderRadius: 8,
    padding: 16,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    position: 'relative',
  };
  const inputStyle = {
    width: '100%',
    height: 28,
    padding: '2px 6px',
    fontSize: 13,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginBottom: 8,
  };
  const sidebarStyle = {
    width: 220,
    maxHeight: '70vh',
    overflowY: 'auto',
    padding: 8,
    border: '1px solid #ddd',
    borderRadius: 4,
    background: '#fff',
  };

  return (
    <div className='container py-4'>
      <h2>Manage Counters</h2>
      <button onClick={addCounter} className="btn btn-secondary">
        + New Counter
      </button>
      <button
        onClick={handleSave}
        disabled={saving}
        className="btn btn-primary"
        style={{ marginLeft: 8 }}
      >
        {saving ? 'Saving…' : 'Save All'}
      </button>

      <div style={{ display: 'flex', gap: 24, marginTop: 16, alignItems: 'flex-start' }}>
        {/* Left: grid of counter cards */}
        <div style={{ flex: 1 }}>
          <div style={gridStyle}>
            {counters.map((c, i) => (
              <div key={i} style={cardStyle}>
                <button
                  onClick={() => removeCounter(i)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                >
                  ×
                </button>

                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <i className={c.icon} style={{ fontSize: 32, color: '#FF6600' }} />
                </div>

                <input
                  type="text"
                  value={c.icon}
                  onChange={e => updateField(i, 'icon', e.target.value)}
                  placeholder="Icon class"
                  style={inputStyle}
                />

                <input
                  type="text"
                  value={c.value}
                  onChange={e => updateField(i, 'value', e.target.value)}
                  placeholder="Value"
                  style={inputStyle}
                />

                <input
                  type="text"
                  value={c.label}
                  onChange={e => updateField(i, 'label', e.target.value)}
                  placeholder="Label"
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: available icons sidebar */}
        <div style={sidebarStyle}>
          <h3 style={{ fontSize: 16, marginBottom: 8 }}>Available Icons</h3>
          {AVAILABLE_ICONS.map((cls, idx) => (
            <div
              key={idx}
              onClick={() => navigator.clipboard.writeText(cls)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '4px 6px',
                borderRadius: 4,
                cursor: 'pointer',
                marginBottom: 6,
                border: '1px solid #ccc',
              }}
            >
              <i className={cls} style={{ marginRight: 8, fontSize: 16 }} />
              <code style={{ fontSize: 12 }}>{cls}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}