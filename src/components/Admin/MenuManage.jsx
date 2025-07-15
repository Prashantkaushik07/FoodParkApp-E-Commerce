// src/components/Admin/MenuManage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MenuManage() {
  // section editor
  const [sec, setSec] = useState({ subtitle:'', title:'', description:'' });
  // items editor
  const [items, setItems]       = useState([]);
  const [form, setForm]         = useState({ name:'', category:'', price:'', image: null });
  const [editingId, setEditing] = useState(null);

  // load both on mount
  useEffect(() => {
    axios.get('/api/admin/menu-section').then(r => setSec(r.data.section)).catch(console.error);
    axios.get('/api/admin/menu-items').then(r => setItems(r.data.items)).catch(console.error);
  }, []);

  // save section text
  const saveSection = async e => {
    e.preventDefault();
    const { data } = await axios.post('/api/admin/menu-section', sec);
    setSec(data.section);
    alert('Section updated');
  };

  // create or update an item
  const saveItem = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name',     form.name);
    fd.append('category', form.category);
    fd.append('price',    form.price);
    if (form.image) fd.append('image', form.image);

    if (editingId) {
      const { data } = await axios.put(`/api/admin/menu-items/${editingId}`, fd);
      setItems(items.map(i=> i._id===editingId ? data : i));
    } else {
      const { data } = await axios.post('/api/admin/menu-items', fd);
      setItems([data, ...items]);
    }
    setForm({ name:'', category:'', price:'', image: null });
    setEditing(null);
  };

  // populate form for edit
  const editItem = item => {
    setEditing(item._id);
    setForm({ name:item.name, category:item.category, price:item.price, image:null });
  };

  // delete item
  const delItem = async id => {
    await axios.delete(`/api/admin/menu-items/${id}`);
    setItems(items.filter(i=>i._id!==id));
  };

  return (
    <div className="container py-4">
      <h1>Menu Management</h1>

      {/* ─── Section Text ─────────────────────────────────────────── */}
      <section className="mb-8">
        <h2>Section Heading</h2>
        <form onSubmit={saveSection} className="space-y-3">
          <div>
            <label>Small Label (subtitle)</label>
            <input
              className="w-full border px-2 py-1"
              value={sec.subtitle}
              onChange={e=>setSec({...sec, subtitle:e.target.value})}
            />
          </div>
          <div>
            <label>Main Title</label>
            <input
              className="w-full border px-2 py-1"
              value={sec.title}
              onChange={e=>setSec({...sec, title:e.target.value})}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              className="w-full border px-2 py-1"
              rows="3"
              value={sec.description}
              onChange={e=>setSec({...sec, description:e.target.value})}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Section</button>
        </form>
      </section>

      <hr/>

      {/* ─── Card Items ───────────────────────────────────────────── */}
      <section>
        <h2>{editingId ? 'Edit' : 'New'} Menu Item</h2>
        <form onSubmit={saveItem} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={e=>setForm({...form, name:e.target.value})}
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={e=>setForm({...form, category:e.target.value})}
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={e=>setForm({...form, price:e.target.value})}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={e=>setForm({...form, image:e.target.files[0]})}
          />
          <button type="submit" className="btn btn-success col-span-full">
            {editingId ? 'Update Item' : 'Add Item'}
          </button>
        </form>

        <ul className="mt-6 space-y-2">
          {items.map(item => (
            <li key={item._id} className="flex items-center justify-between border p-2">
              <span>{item.name} — ${item.price.toFixed(2)}</span>
              <div className="space-x-2">
                <button onClick={()=>editItem(item)} className="btn btn-sm btn-warning">✏️</button>
                <button onClick={()=>delItem(item._id)} className="btn btn-sm btn-danger">🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
