// src/components/Header.jsx
import React, { useState, useEffect } from 'react'
import { Link, NavLink }          from 'react-router-dom'
import axios                       from 'axios'
import './Header.css'              // if you need any small overrides

export default function Header() {
  const [cfg, setCfg] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    axios.get('/api/header-settings')
      .then(res => setCfg(res.data.settings || res.data))
      .catch(err => console.error(err))
  }, [])

  if (!cfg) return null
  const {
    topbar,
    social,
    menuItems,
    pagesDropdown = [],
    searchPlaceholder = 'Search…',
    cartCount = 0,
    userLink = '/signin',
    reservation,
  } = cfg

  return (
    <>
      {/* TOPBAR */}
      <section className="fp__topbar bg-warning text-white py-1">
        <div className="container d-flex align-items-center justify-content-between">
          <ul className="fp__topbar_info list-unstyled d-flex mb-0">
            <li className="me-4">
              <a className="text-white" href={`mailto:${topbar.email}`}>
                <i className="fas fa-envelope me-1" /> {topbar.email}
              </a>
            </li>
            <li>
              <a className="text-white" href={`tel:${topbar.phone}`}>
                <i className="fas fa-phone-alt me-1" /> {topbar.phone}
              </a>
            </li>
          </ul>
          <ul className="topbar_icon list-unstyled d-flex mb-0">
            {social.map((s,i) => (
              <React.Fragment key={i}>
                <li className="px-2">
                  <a className="text-white" href={s.url} target="_blank" rel="noreferrer">
                    <i className={s.iconClass} />
                  </a>
                </li>
                {i < social.length - 1 && <li className="border-start border-white mx-2 h-100" />}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </section>

      {/* MAIN NAV */}
      <nav className="navbar navbar-expand-lg main_menu shadow-sm">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand me-4" to="/">
            <img src="/images/logo.png" alt="Logo" className="img-fluid" />
          </Link>

          {/* Hamburger for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <i className="fas fa-bars" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Left nav links */}
            <ul className="navbar-nav m-auto">
              {menuItems.map((item, idx) => (
                <li className="nav-item" key={idx}>
                  <NavLink
                    to={item.to}
                    className="nav-link"
                    activeClassName="active"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {/* Pages dropdown */}
              {pagesDropdown.length > 0 && (
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </span>
                  <ul className="dropdown-menu">
                    {pagesDropdown.map((p,i) => (
                      <li key={i}>
                        <Link className="dropdown-item" to={p.url}>
                          {p.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )}
            </ul>

            {/* Right icons/button */}
            <ul className="list-unstyled d-flex mb-0 align-items-center">
              {/* Search */}
              <li className="me-3 position-relative">
                <button
                  className="btn btn-link p-0 text-dark"
                  onClick={() => setSearchOpen(open => !open)}
                >
                  <i className="fas fa-search" />
                </button>
                {searchOpen && (
                  <div className="position-absolute bg-white p-3 shadow-sm" style={{ top: '2rem', right: 0, zIndex: 1000 }}>
                    <form onSubmit={e=>e.preventDefault()}>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={searchPlaceholder}
                        />
                        <button className="btn btn-primary" type="submit">
                          Go
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </li>

              {/* Cart */}
              <li className="me-3 position-relative">
                <Link to="/cart" className="text-dark">
                  <i className="fas fa-shopping-basket" />
                  {cartCount > 0 && (
                    <span className="badge bg-danger rounded-circle position-absolute" style={{ top: '-0.5rem', right: '-0.5rem' }}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>

              {/* User */}
              <li className="me-4">
                <Link to={userLink} className="text-dark">
                  <i className="fas fa-user" />
                </Link>
              </li>

              {/* Reservation */}
              <li>
                <button
                  className="btn btn-warning text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  {reservation.text}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
