import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SliderEditor() {
  const [sliders, setSliders] = useState([]);
  const [form, setForm] = useState({
    text: '',
    subtitle: '',
    description: '',
    discount: '',
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const API = 'http://localhost:5000/api/slider';

  useEffect(() => {
    axios.get(API)
      .then(({ data }) => setSliders(data.sliders))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const onFileChange = e => setFile(e.target.files[0] || null);

  const onSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('text', form.text);
    fd.append('subtitle', form.subtitle);
    fd.append('description', form.description);
    fd.append('discount', form.discount);
    if (file) fd.append('img', file);

    try {
      let res;
      if (editingId) {
        res = await axios.put(`${API}/${editingId}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSliders(s =>
          s.map(sl => sl._id === editingId ? res.data.slider : sl)
        );
      } else {
        res = await axios.post(API, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setSliders(s => [...s, res.data.slider]);
      }
      // Reset form
      setForm({ text: '', subtitle: '', description: '', discount: '' });
      setFile(null);
      setEditingId(null);
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to save slider');
    }
  };

  const onEdit = sl => {
    setForm({
      text: sl.text,
      subtitle: sl.subtitle || '',
      description: sl.description || '',
      discount: sl.discount
    });
    setEditingId(sl._id);
    setFile(null);
  };

  const onDelete = async id => {
    if (!window.confirm('Delete this slider?')) return;
    try {
      await axios.delete(`${API}/${id}`);
      setSliders(s => s.filter(sl => sl._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete');
    }
  };

  return (
    <div className="container py-4">
      <h2>{editingId ? 'Edit Slider' : 'New Slider'}</h2>
      <form onSubmit={onSubmit} className="mb-4">
        <div className="row g-3">
          {/* Text */}
          <div className="col">
            <label className="form-label">Text</label>
            <input
              name="text"
              className="form-control"
              placeholder="Slider text"
              value={form.text}
              onChange={onChange}
              required
            />
          </div>

          {/* Subtitle */}
          <div className="col">
            <label className="form-label">Subtitle</label>
            <input
              name="subtitle"
              className="form-control"
              placeholder="Subtitle"
              value={form.subtitle}
              onChange={onChange}
            />
          </div>

          {/* Description */}
          <div className="col">
            <label className="form-label">Description</label>
            <input
              name="description"
              className="form-control"
              placeholder="Description"
              value={form.description}
              onChange={onChange}
            />
          </div>

          {/* Discount */}
          <div className="col">
            <label className="form-label">Discount</label>
            <input
              name="discount"
              className="form-control"
              placeholder="e.g. 30% off"
              value={form.discount}
              onChange={onChange}
              required
            />
          </div>

          {/* Image */}
          <div className="col">
            <label className="form-label">Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={onFileChange}
              {...(!editingId ? { required: true } : {})}
            />
          </div>

          {/* Submit Button */}
          <div className="col d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100">
              {editingId ? 'Update Slider' : 'Create Slider'}
            </button>
          </div>
        </div>
      </form>


      <h3>Existing Sliders</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped w-100">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Text</th>
              <th>Subtitle</th>
              <th>Description</th>
              <th>Discount</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map(sl => (
              <tr key={sl._id}>
                <td style={{ width: 80 }}>
                  {sl.img && (
                    <img
                      src={`http://localhost:5000/${sl.img}`}
                      alt={sl.text}
                      className="img-fluid rounded"
                    />
                  )}
                </td>
                <td>{sl.text}</td>
                <td>{sl.subtitle}</td>
                <td>{sl.description}</td>
                <td>{sl.discount}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => onEdit(sl)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(sl._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
