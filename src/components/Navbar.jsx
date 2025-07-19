// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const [cfg, setCfg] = useState(null);

  useEffect(() => {
    axios.get('/api/header-settings')
      .then(({ data }) => {
        console.log('Navbar API Response:', data.settings || data); // Debug
        setCfg(data.settings || data);
      })
      .catch(console.error);
  }, []);

  if (!cfg) return null;

  const { menuItems = [], reservation, logo = '/images/logo.png' } = cfg;

  return (
    <nav className="navbar navbar-expand-lg main_menu">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="img-fluid" />
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
            {menuItems.map((item, idx) =>
              item.children && item.children.length > 0 ? (
                <li className="nav-item dropdown" key={idx}>
                  <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {item.label}
                  </span>
                  <ul className="droap_menu">
                    {item.children.map((child, cidx) => (
                      <li key={cidx}>
                        <Link to={child.to}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item" key={idx}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          {reservation?.text && (
            <Link className="common_btn" to={reservation.url}>
              {reservation.text}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
