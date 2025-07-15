// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const [cfg, setCfg] = useState(null);

  useEffect(() => {
    axios.get('/api/header-settings')
      .then(({ data }) => setCfg(data.settings))
      .catch(console.error);
  }, []);

  if (!cfg) return null;
  const { topbar, social, menuItems, reservation } = cfg;

  return (
    <>
      {/* Topbar */}
      <section className="fp__topbar">
        <div className="container d-flex justify-content-between">
          <ul className="fp__topbar_info list-unstyled d-flex mb-0">
            <li className="me-4">
              <a href={`mailto:${topbar.email}`}>
                <i className="fas fa-envelope me-1" /> {topbar.email}
              </a>
            </li>
            <li>
              <a href={`tel:${topbar.phone}`}>
                <i className="fas fa-phone-alt me-1" /> {topbar.phone}
              </a>
            </li>
          </ul>

          <ul className="topbar_icon list-unstyled d-flex mb-0">
            {social.map((s, i) => (
              <li className="me-0" key={i}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  <i className={s.iconClass} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Main Nav */}
      <nav className="navbar navbar-expand-lg main_menu">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/images/logo.png" alt="Logo" className="img-fluid" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav m-auto">
              {menuItems.map((item, idx) => (
                <li className="nav-item" key={idx}>
                  <NavLink to={item.to} className="nav-link">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <Link className="common_btn" to={reservation.url}>
              {reservation.text}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
