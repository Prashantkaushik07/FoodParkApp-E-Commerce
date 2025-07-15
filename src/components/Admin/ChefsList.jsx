// src/admin/ChefsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChefForm from './ChefForm';

export default function ChefsList() {
  const [chefs, setChefs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  // Fetch list of chefs
  const fetchChefs = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/chefs');
      setChefs(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load chefs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this chef?')) return;
    try {
      await axios.delete(`/api/admin/chefs/${id}`);
      fetchChefs();
    } catch (err) {
      console.error(err);
      setError('Failed to delete chef');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Chefs</h2>
      <button onClick={() => setEditing({})} style={{ marginBottom: 16 }}>
        + New Chef
      </button>
      {error && (
        <div style={{ color: 'red', marginBottom: 16 }}>
          {error}
        </div>
      )}
      {loading ? (
        <p>Loading chefs…</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 16
          }}
        >
          {chefs.map(c => (
            <div
              key={c._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 12,
                textAlign: 'center'
              }}
            >
              <img
                src={c.imageUrl}
                alt={c.name}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  marginBottom: 8
                }}
              />
              <div>
                <strong>{c.name}</strong>
                <div style={{ fontSize: 14, color: '#555' }}>
                  {c.position}
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => setEditing(c)} style={{ marginRight: 8 }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(c._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== null && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff',
            padding: 20,
            borderRadius: 8,
            minWidth: 320
          }}>
            <h3>{editing._id ? 'Edit Chef' : 'Add New Chef'}</h3>
            <ChefForm
              initial={editing}
              onSuccess={() => {
                setEditing(null);
                fetchChefs();
              }}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
