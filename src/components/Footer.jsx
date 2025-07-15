// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Footer() {
  const [s, setS] = useState(null);

  useEffect(() => {
    axios.get('/api/footer-settings/public')
      .then(r => setS(r.data.settings))
      .catch(console.error);
  }, []);

  if (!s) return null;

  return (
    <footer>
      {/* Top section */}
      <div className="footer_overlay pt_100 xs_pt_70 pb_100 xs_pb_70">
        <div className="container wow fadeInUp" data-wow-duration="1s">
          <div className="row justify-content-between">

            {/* 1️⃣ Logo & Contact */}
            <div className="col-lg-4 col-sm-8 col-md-6">
              <div className="fp__footer_content">
                <a className="footer_logo d-block mb-3" href="/">
                  <img
                    src="/images/footer_logo.png"
                    alt="FoodPark"
                    className="img-fluid w-100"
                    style={{ maxWidth: '120px' }}
                  />
                </a>
                <span>{s.description}</span>
                <p className="info">
                  <i className="far fa-map-marker-alt"></i> {s.contact.address}
                </p>
                <a className="info" href={`tel:${s.contact.phone}`}>
                  <i className="fas fa-phone-alt"></i> {s.contact.phone}
                </a>
                <a className="info" href={`mailto:${s.contact.email}`}>
                  <i className="fas fa-envelope"></i> {s.contact.email}
                </a>
              </div>
            </div>

            {/* 2️⃣ Short Links */}
            <div className="col-lg-2 col-sm-4 col-md-6">
              <div className="fp__footer_content">
                <h3>Short Link</h3>
                <ul>
                  {s.shortLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.url}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3️⃣ Help Links */}
            <div className="col-lg-2 col-sm-4 col-md-6 order-sm-4 order-lg-3">
              <div className="fp__footer_content">
                <h3>Help Link</h3>
                <ul>
                  {s.helpLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.url}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4️⃣ Subscribe & Follow */}
            <div className="col-lg-3 col-sm-8 col-md-6 order-lg-4">
              <div className="fp__footer_content">
                <h3>Subscribe</h3>
                <form>
                  <input type="email" placeholder="Subscribe" />
                  <button type="submit">Subscribe</button>
                </form>
                <div className="fp__footer_social_link">
                  <h5>follow us:</h5>
                  <ul className="d-flex flex-wrap">
                    {s.followLinks.map((f, i) => (
                      <li key={i}>
                        <a href={f.url}>
                          <i className={f.iconClass}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fp__footer_bottom d-flex flex-wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="fp__footer_bottom_text d-flex flex-wrap justify-content-between">
                <p>
                  Copyright {new Date().getFullYear()} <b>FoodPark</b> All Rights Reserved.
                </p>
                <ul className="d-flex flex-wrap">
                  {s.bottomLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.url}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
