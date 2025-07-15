// src/components/Admin/HeaderEditor.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HeaderEditor() {
  const [form, setForm]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

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
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;
  if (!form)  return <p>No settings available.</p>;

  // Deep‐update helper
  const update = (path, value) => {
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      path.split('.').reduce((o,k,i,arr) => {
        if (i===arr.length-1) o[k] = value;
        return o[k];
      }, copy);
      return copy;
    });
  };

  // Helpers for arrays
  const changeArray = (key, i, field, val) => {
    const arr = [...form[key]];
    arr[i] = { ...arr[i], [field]: val };
    setForm(f => ({ ...f, [key]: arr }));
  };
  const addArray = (key, template) =>
    setForm(f => ({ ...f, [key]: [...(f[key]||[]), template] }));

  // Submit
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
      <h2>Edit Header &amp; Nav</h2>
      <form onSubmit={onSubmit} className="row gx-3 gy-4">

        {/* Topbar */}
        <h4>Topbar</h4>
        {['email','phone'].map((field, idx) => (
          <div key={idx} className="col-md-6">
            <label className="form-label">{field.charAt(0).toUpperCase()+field.slice(1)}</label>
            <input
              type={field==='email'?'email':'text'}
              className="form-control"
              value={form.topbar[field]||''}
              onChange={e=>update(`topbar.${field}`,e.target.value)}
              required
            />
          </div>
        ))}

        {/* Social Icons */}
        <h4 className="mt-4">Social Icons</h4>
        {(form.social||[]).map((s,i) => (
          <React.Fragment key={i}>
            <div className="col-md-3">
              <label>Name</label>
              <input
                className="form-control"
                value={s.name||''}
                onChange={e=>changeArray('social',i,'name',e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <label>Icon Class</label>
              <input
                className="form-control"
                value={s.iconClass||''}
                onChange={e=>changeArray('social',i,'iconClass',e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>URL</label>
              <input
                type="url"
                className="form-control"
                value={s.url||''}
                onChange={e=>changeArray('social',i,'url',e.target.value)}
              />
            </div>
          </React.Fragment>
        ))}
        <div className="col-12">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={()=>addArray('social',{ name:'', iconClass:'', url:'' })}
          >+ Add Social Icon</button>
        </div>

        {/* Main menu */}
        <h4 className="mt-4">Main Menu Links</h4>
        {(form.menuItems||[]).map((m,i)=>(
          <React.Fragment key={i}>
            <div className="col-md-6">
              <label>Label</label>
              <input
                className="form-control"
                value={m.label||''}
                onChange={e=>changeArray('menuItems',i,'label',e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Route</label>
              <input
                className="form-control"
                value={m.to||''}
                onChange={e=>changeArray('menuItems',i,'to',e.target.value)}
              />
            </div>
          </React.Fragment>
        ))}
        <div className="col-12">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={()=>addArray('menuItems',{ label:'', to:'' })}
          >+ Add Nav Link</button>
        </div>

        {/* Pages dropdown */}
        <h4 className="mt-4">“Pages” Dropdown Items</h4>
        {(form.pagesDropdown||[]).map((p,i)=>(
          <React.Fragment key={i}>
            <div className="col-md-6">
              <label>Label</label>
              <input
                className="form-control"
                value={p.label||''}
                onChange={e=>changeArray('pagesDropdown',i,'label',e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label>Link</label>
              <input
                className="form-control"
                value={p.url||''}
                onChange={e=>changeArray('pagesDropdown',i,'url',e.target.value)}
              />
            </div>
          </React.Fragment>
        ))}
        <div className="col-12">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={()=>addArray('pagesDropdown',{ label:'', url:'' })}
          >+ Add Dropdown Item</button>
        </div>

        {/* Search form */}
        <h4 className="mt-4">Search Form</h4>
        <div className="col-md-12">
          <label>Placeholder</label>
          <input
            className="form-control"
            value={form.searchPlaceholder||''}
            placeholder="Search…"
            onChange={e=>setForm(f=>({...f,searchPlaceholder:e.target.value}))}
          />
        </div>

        {/* Cart & User */}
        <h4 className="mt-4">Cart &amp; User</h4>
        <div className="col-md-6">
          <label>Cart Badge Count</label>
          <input
            type="number"
            className="form-control"
            value={form.cartCount||0}
            onChange={e=>setForm(f=>({...f,cartCount:+e.target.value}))}
          />
        </div>
        <div className="col-md-6">
          <label>User Profile URL</label>
          <input
            type="url"
            className="form-control"
            value={form.userLink||''}
            onChange={e=>setForm(f=>({...f,userLink:e.target.value}))}
          />
        </div>

        {/* Reservation */}
        <h4 className="mt-4">Reservation Modal</h4>
        <div className="col-md-6">
          <label>Button Text</label>
          <input
            className="form-control"
            value={form.reservation.buttonText||''}
            onChange={e=>update('reservation.buttonText',e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label>Button Link or Toggle</label>
          <input
            className="form-control"
            value={form.reservation.link||''}
            onChange={e=>update('reservation.link',e.target.value)}
          />
        </div>

        {/* Reservation form fields */}
        {['name','phone','date'].map((fld,idx)=>(
          <div key={idx} className="col-md-4">
            <label>{fld.charAt(0).toUpperCase()+fld.slice(1)} Placeholder</label>
            <input
              className="form-control"
              value={form.reservation.placeholders?.[fld]||''}
              onChange={e=>{
                setForm(f=>{
                  const ph = {...(f.reservation.placeholders||{})};
                  ph[fld] = e.target.value;
                  return {...f, reservation:{...f.reservation, placeholders:ph}};
                });
              }}
            />
          </div>
        ))}

        {/* Time slots */}
        <h5 className="mt-3">Time Slot Options</h5>
        {(form.reservation.timeSlots||[]).map((t,i)=>(
          <div key={i} className="col-md-6">
            <label>Option {i+1}</label>
            <input
              className="form-control"
              value={t}
              onChange={e=>{
                const arr = [...form.reservation.timeSlots];
                arr[i] = e.target.value;
                setForm(f=>({...f, reservation:{...f.reservation, timeSlots:arr}}));
              }}
            />
          </div>
        ))}
        <div className="col-12">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={()=>setForm(f=>{
              const arr = [...(f.reservation.timeSlots||[])];
              return {...f, reservation:{...f.reservation, timeSlots:[...arr,'']}};
            })}
          >+ Add Time Slot</button>
        </div>

        {/* Person counts */}
        <h5 className="mt-3">Person Count Options</h5>
        {(form.reservation.personOptions||[]).map((p,i)=>(
          <div key={i} className="col-md-6">
            <label>Option {i+1}</label>
            <input
              className="form-control"
              value={p}
              onChange={e=>{
                const arr = [...form.reservation.personOptions];
                arr[i] = e.target.value;
                setForm(f=>({...f, reservation:{...f.reservation, personOptions:arr}}));
              }}
            />
          </div>
        ))}
        <div className="col-12 mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={()=>setForm(f=>{
              const arr = [...(f.reservation.personOptions||[])];
              return {...f, reservation:{...f.reservation, personOptions:[...arr,'']}};
            })}
          >+ Add Person Option</button>
        </div>

        {/* Save button */}
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">Save All</button>
        </div>

      </form>
    </div>
  );
}
