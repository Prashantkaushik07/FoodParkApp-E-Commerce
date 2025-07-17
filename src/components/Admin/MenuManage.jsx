import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MenuManage() {
  const [sec, setSec] = useState({ subtitle: '', title: '', description: '' });
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: '', category: '', badgeLabel: '', price: '', image: null
  });
  const [editingId, setEditing] = useState(null);

  useEffect(() => {
    axios.get('/api/admin/menu-section').then(r => setSec(r.data.section)).catch(console.error);
    axios.get('/api/admin/menu-items').then(r => setItems(r.data.items)).catch(console.error);
  }, []);

  const saveSection = async e => {
    e.preventDefault();
    const { data } = await axios.post('/api/admin/menu-section', sec);
    setSec(data.section);
    alert('✅ Section updated');
  };

  const saveItem = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', form.name);
    fd.append('category', form.category);
    fd.append('badgeLabel', form.badgeLabel);
    fd.append('price', form.price);
    if (form.image) fd.append('image', form.image);

    try {
      if (editingId) {
        const { data } = await axios.put(`/api/admin/menu-items/${editingId}`, fd);
        setItems(items.map(i => i._id === editingId ? data : i));
        alert('✅ Item updated');
      } else {
        const { data } = await axios.post('/api/admin/menu-items', fd);
        setItems([data, ...items]);
        alert('✅ Item added');
      }
      setForm({ name: '', category: '', badgeLabel: '', price: '', image: null });
      setEditing(null);
    } catch (err) {
      console.error('❌ Save item failed', err);
      alert('❌ Save failed');
    }
  };

  const editItem = item => {
    setEditing(item._id);
    setForm({
      name: item.name,
      category: item.category,
      badgeLabel: item.badgeLabel || '',
      price: item.price,
      image: null
    });
  };

  const delItem = async id => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    await axios.delete(`/api/admin/menu-items/${id}`);
    setItems(items.filter(i => i._id !== id));
  };

  return (
    <div className="container py-4">
      {/* Section Editor */}
      <h1 className="mb-4">🍽️ Menu Section Settings</h1>
      <form onSubmit={saveSection} className="space-y-3 mb-5">
        <div>
          <label>Small Label (Subtitle)</label>
          <input
            className="form-control"
            value={sec.subtitle}
            onChange={e => setSec({ ...sec, subtitle: e.target.value })}
          />
        </div>
        <div>
          <label>Main Title</label>
          <input
            className="form-control"
            value={sec.title}
            onChange={e => setSec({ ...sec, title: e.target.value })}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={sec.description}
            onChange={e => setSec({ ...sec, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          💾 Save Section
        </button>
      </form>

      {/* Menu Items */}
      <hr className="my-5" />
      <h2 className="fp__section_heading mb_45">
        <h4>Admin Panel</h4>
        <h2>{editingId ? '✏️ Edit Menu Item' : '➕ New Menu Item'}</h2>
        <span>
          <img src="images/heading_shapes.png" alt="shapes" className="img-fluid w-100" />
        </span>
        <p>Add or edit your food items below</p>
      </h2>

      {/* Item Form */}
      <form onSubmit={saveItem} className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            placeholder="Category"
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            placeholder="Badge Label (e.g., 'Biryani', 'Grill')"
            value={form.badgeLabel}
            onChange={e => setForm({ ...form, badgeLabel: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="file"
            accept="image/*"
            onChange={e => setForm({ ...form, image: e.target.files[0] })}
            className="form-control"
          />
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">
            {editingId ? '✅ Update Item' : '➕ Add Item'}
          </button>
        </div>
      </form>

      {/* Item List */}
      <div className="row">
        {items.map(item => (
          <div key={item._id} className="col-md-4 mb-4">
            <div className="card shadow-sm position-relative">
              {/* Badge */}
              <span className="position-absolute top-0 start-0 badge bg-warning text-dark">
                {item.badgeLabel || item.category}
              </span>
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  <strong>Category:</strong> {item.category}<br />
                  <strong>Price:</strong> ${item.price.toFixed(2)}
                </p>
                <div className="d-flex justify-content-between">
                  <button
                    onClick={() => editItem(item)}
                    className="btn btn-warning btn-sm"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => delItem(item._id)}
                    className="btn btn-danger btn-sm"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
