import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DailyOfferEditor() {
  const blankOffer = { img: '', discount: '', title: '', desc: '' };

  const [form, setForm] = useState({
    small: '',
    title: '',
    subTitle: '',
    offers: [ {...blankOffer}, {...blankOffer}, {...blankOffer}, {...blankOffer} ],
    actions: []
  });
  const [files, setFiles] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/daily-offer')
      .then(({ data }) => {
        const d = data.daily || {};
        setForm({
          small: d.small || '',
          title: d.title || '',
          subTitle: d.subTitle || '',
          offers: Array.isArray(d.offers) && d.offers.length === 4
            ? d.offers
            : [ {...blankOffer}, {...blankOffer}, {...blankOffer}, {...blankOffer} ],
          actions: Array.isArray(d.actions) ? d.actions : []
        });
      })
      .catch(err => console.error('Load admin daily-offer failed:', err))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (key, val) =>
    setForm(f => ({ ...f, [key]: val }));

  const updateOffer = (i, key, val) =>
    setForm(f => {
      const o = [...f.offers];
      o[i] = { ...o[i], [key]: val };
      return { ...f, offers: o };
    });

  const pickFile = (i, file) =>
    setFiles(fs => { const c = [...fs]; c[i] = file; return c; });

  const onSubmit = async e => {
    e.preventDefault();
    const jsonPayload = {
      small: form.small,
      title: form.title,
      subTitle: form.subTitle,
      offers: form.offers.map((o, i) => ({
        discount: o.discount,
        title: o.title,
        desc: o.desc,
        img: o.img
      })),
      actions: form.actions
    };

    const fd = new FormData();
    fd.append('data', JSON.stringify(jsonPayload));
    files.forEach((file, i) => {
      if (file) fd.append('images', file);
    });

    try {
      await axios.post('http://localhost:5000/api/admin/daily-offer', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('✅ Saved successfully!');
    } catch (err) {
      console.error('❌ Save failed:', err.response || err);
      alert('❌ Save failed');
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Edit Daily Offer</h2>
      <form onSubmit={onSubmit}>
        {/* Header Fields */}
        <div className="row mb-4">
          {['small', 'title', 'subTitle'].map(k => (
            <div key={k} className="col-md-4 mb-3">
              <label className="form-label text-capitalize fw-bold">{k}</label>
              <input
                type="text"
                className="form-control"
                value={form[k]}
                onChange={e => updateField(k, e.target.value)}
                required
              />
            </div>
          ))}
        </div>

        {/* Offers */}
        <h4 className="mb-3">Offers</h4>
        {form.offers.map((o, i) => (
          <div key={i} className="border rounded p-3 mb-4">
            <h5 className="mb-3">Offer #{i + 1}</h5>
            <div className="row g-3 align-items-start">
              {/* Image Preview + File Upload */}
              <div className="col-md-3">
                <label className="form-label fw-bold">Image</label>
                {o.img && !files[i] && (
                  <img
                    src={`http://localhost:5000${o.img}`}
                    alt={`Offer ${i + 1}`}
                    className="img-fluid rounded mb-2"
                  />
                )}
                <input
                  type="file"
                  className="form-control"
                  onChange={e => pickFile(i, e.target.files[0])}
                />
              </div>

              {/* Offer Details */}
              <div className="col-md-9">
                <div className="row g-3">
                  {['discount', 'title', 'desc'].map(k => (
                    <div key={k} className="col-md-4">
                      <label className="form-label text-capitalize fw-bold">{k}</label>
                      <input
                        type="text"
                        className="form-control"
                        value={o[k]}
                        onChange={e => updateOffer(i, k, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Actions */}
        <h4 className="mb-3">Popup Actions</h4>
        <div className="row g-3">
          {form.actions.map((a, i) => (
            <div key={i} className="col-md-6 d-flex align-items-center">
              <div className="me-3">
                <i className={`${a.icon} fs-3`}></i>
              </div>
              <div className="flex-grow-1">
                <label className="form-label">Action #{i + 1} URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={a.url}
                  onChange={e => {
                    const updated = [...form.actions];
                    updated[i] = { ...updated[i], url: e.target.value };
                    setForm(f => ({ ...f, actions: updated }));
                  }}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-4 text-end">
          <button type="submit" className="btn btn-success px-4">
            Save Daily Offer
          </button>
        </div>
      </form>
    </div>
  );
}
