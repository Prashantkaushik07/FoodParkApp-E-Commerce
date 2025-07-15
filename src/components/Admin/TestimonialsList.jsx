// src/components/Admin/TestimonialsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TestimonialForm from './TestimonialForm';

export default function TestimonialsList() {
  const [items, setItems]     = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const res = await axios.get('/api/admin/testimonials');
    setItems(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this testimonial?')) return;
    await axios.delete(`/api/admin/testimonials/${id}`);
    fetchAll();
  };

  return (
    <div style={{ padding: 20, background: '#ecf0f1', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: 8 }}>Manage Testimonials</h2>
      <button
        onClick={() => setEditing({})}
        style={{ 
          background: 'none', 
          border: 'none', 
          color: '#ff7a00', 
          cursor: 'pointer', 
          marginBottom: 16 
        }}
      >
        + New Testimonial
      </button>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))',
          gap: 16,
          height: 390
        }}>
          {items.map(i => (
            <div key={i._id} style={{
              position: 'relative',
              background: '#fff',
              border: '1px solid #f1f1f1',
              borderRadius: 8,
              paddingTop: 131,
              textAlign: 'center',
              overflow: 'hidden'
            }}>
              {/* Avatar */}
              <div style={{
                position: 'absolute',
                top: 10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: '4px solid #ff7a00',
                overflow: 'hidden',
                background: '#fff'
              }}>
                <img
                  src={i.avatarUrl}
                  alt={i.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Content */}
              <div style={{ margin: '12px 16px 8px' }}>
                <div style={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: 16,
                  letterSpacing: 1,
                }}>
                  {i.name}
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#777',
                  marginTop: 4,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5
                }}>
                  {i.location}
                </div>
                <p style={{
                  fontSize: 14,
                  color: '#444',
                  margin: '8px 0',
                  lineHeight: 1.4,
                  maxHeight: 100,
                  overflow: 'hidden'
                }}>
                  {i.quote}
                </p>
                <div style={{ color: '#ff7a00', fontSize: 14 }}>
                  {'★'.repeat(i.rating) + '☆'.repeat(5 - i.rating)}
                </div>
              </div>

              {/* Actions */}
              <div style={{ marginTop: 12, marginBottom: 16 }}>
                <button
                  onClick={() => setEditing(i)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#333',
                    cursor: 'pointer',
                    marginRight: 8
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(i._id)}
                  style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', borderRadius: 8,
            padding: 20, minWidth: 360, maxHeight: '90vh', overflowY: 'auto'
          }}>
            <h3 style={{ marginTop: 0 }}>
              {editing._id ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h3>
            <TestimonialForm
              initial={editing}
              onSuccess={() => {
                setEditing(null);
                fetchAll();
              }}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
