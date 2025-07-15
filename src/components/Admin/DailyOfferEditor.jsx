// src/components/Admin/DailyOfferEditor.jsx
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function DailyOfferEditor() {
  // create 4 independent offer slots
  const blankOffer = { img:'', discount:'', title:'', desc:'' }
  const blankAction = { icon:'', url:'' }

  const [form, setForm] = useState({
    small:    '',
    title:    '',
    subTitle: '',
    offers:   [ {...blankOffer}, {...blankOffer}, {...blankOffer}, {...blankOffer} ],
    actions:  [ {...blankAction}, {...blankAction}, {...blankAction} ]
  })
  const [files, setFiles] = useState([null, null, null, null])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/daily-offer')
      .then(({ data }) => {
        if (data.daily) {
          const d = data.daily
          setForm(f => ({
            small:    d.small    || f.small,
            title:    d.title    || f.title,
            subTitle: d.subTitle || f.subTitle,
            offers:   (d.offers?.length===4) ? d.offers : f.offers,
            actions:  (d.actions?.length===3)? d.actions: f.actions
          }))
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const updateField = (key, val) =>
    setForm(f => ({ ...f, [key]: val }))

  const updateOffer = (i, key, val) =>
    setForm(f => {
      const o = [...f.offers]
      o[i] = { ...o[i], [key]: val }
      return { ...f, offers: o }
    })

  const pickFile = (i, file) =>
    setFiles(fs => {
      const c = [...fs]
      c[i] = file
      return c
    })

  const updateAction = (i, key, val) =>
    setForm(f => {
      const a = [...f.actions]
      a[i] = { ...a[i], [key]: val }
      return { ...f, actions: a }
    })

  const onSubmit = async e => {
    e.preventDefault()
    const fd = new FormData()
    // headings
    fd.append('small',    form.small)
    fd.append('title',    form.title)
    fd.append('subTitle', form.subTitle)
    // offers
    form.offers.forEach((o,i) => {
      fd.append(`offers[${i}][discount]`, o.discount)
      fd.append(`offers[${i}][title]`,    o.title)
      fd.append(`offers[${i}][desc]`,     o.desc)
      if (files[i]) fd.append(`offers[${i}][img]`, files[i])
      else          fd.append(`offers[${i}][img]`, o.img)
    })
    // actions
    form.actions.forEach((a,i) => {
      fd.append(`actions[${i}][icon]`, a.icon)
      fd.append(`actions[${i}][url]`,  a.url)
    })

    try {
      await axios.post(
        'http://localhost:5000/api/admin/daily-offer',
        fd,
        { headers:{ 'Content-Type':'multipart/form-data' } }
      )
      alert('Saved!')
    } catch(err) {
      console.error(err)
      alert('Save failed')
    }
  }

  if (loading) return <p>Loading…</p>

  return (
    <div className="container py-4">
      <h2>Edit Daily Offer</h2>
      <form onSubmit={onSubmit} className="row g-3">
        {/* headings */}
        {['small','title','subTitle'].map(k=>(
          <div key={k} className="col-md-4">
            <label className="form-label text-capitalize">{k}</label>
            <input
              className="form-control"
              value={form[k]}
              onChange={e=>updateField(k,e.target.value)}
              required
            />
          </div>
        ))}

        {/* offers */}
        <h3 className="mt-4">Offers</h3>
        {form.offers.map((o,i)=>(
          <div key={i} className="col-12 border p-3 mb-3 rounded">
            <h5>Offer #{i+1}</h5>
            <div className="row g-3">
              {/* image */}
              <div className="col-md-3">
                <label className="form-label">Image</label>
                {o.img && !files[i] && (
                  <img
                    src={`http://localhost:5000/${o.img}`}
                    className="img-fluid mb-2"
                  />
                )}
                <input
                  type="file"
                  className="form-control"
                  onChange={e=>pickFile(i,e.target.files[0])}
                />
              </div>
              {['discount','title','desc'].map(k=>(
                <div key={k} className="col-md-3">
                  <label className="form-label text-capitalize">{k}</label>
                  <input
                    className="form-control"
                    value={o[k]}
                    onChange={e=>updateOffer(i,k,e.target.value)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* actions */}
        <h3 className="mt-4">Popup Actions</h3>
        {form.actions.map((a,i)=>(
          <div key={i} className="col-md-4">
            <label className="form-label">Action #{i+1} Icon</label>
            <input
              className="form-control mb-1"
              value={a.icon}
              onChange={e=>updateAction(i,'icon',e.target.value)}
              placeholder="e.g. fas fa-shopping-basket"
              required
            />
            <label className="form-label">Action #{i+1} URL</label>
            <input
              className="form-control"
              value={a.url}
              onChange={e=>updateAction(i,'url',e.target.value)}
              placeholder="#"
            />
          </div>
        ))}

        <div className="col-12 text-end">
          <button className="btn btn-success">Save Daily Offer</button>
        </div>
      </form>
    </div>
  )
}
