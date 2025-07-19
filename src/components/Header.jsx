import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';


export default function Header() {
  const [cfg, setCfg] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/header-settings')
      .then(({ data }) => setCfg(data.settings || data))
      .catch(console.error);
  }, []);

  if (!cfg) return null;

  const {
    topbar,
    social,
    menuItems = [],
    searchPlaceholder = 'Search . . .',
    cartCount = 0,
    userLink = '/signin',
    reservation,
    logo = '/images/logo.png'
  } = cfg;

  return (
    <>
      {/* =============================
          TOPBAR START
      ============================== */}
      <section className="fp__topbar">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-8">
              <ul className="fp__topbar_info d-flex flex-wrap">
                <li>
                  <a href={`mailto:${topbar.email}`}>
                    <i className="fas fa-envelope"></i> {topbar.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${topbar.phone}`}>
                    <i className="fas fa-phone-alt"></i> {topbar.phone}
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-xl-6 col-md-4 d-none d-md-block">
              <ul className="topbar_icon d-flex flex-wrap">
                {social.map((s, i) => (
                  <li key={i}>
                    <a href={s.url} target="_blank" rel="noreferrer">
                      <i className={s.iconClass}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* =============================
          TOPBAR END
      ============================== */}

      {/* =============================
          MENU START
      ============================== */}
      <nav className="navbar navbar-expand-lg main_menu">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="FoodPark" className="img-fluid" />
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="far fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Main Menu */}
            <ul className="navbar-nav m-auto">
              {menuItems.map((item, idx) =>
                item.children && item.children.length > 0 ? (
                  <li className="nav-item" key={idx}>
                    <a className="nav-link" href="#">
                      {item.label} <i className="far fa-angle-down"></i>
                    </a>
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
                      className={({ isActive }) =>
                        `nav-link ${isActive ? 'active' : ''}`
                      }
                      aria-current={item.to === '/' ? 'page' : undefined}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            {/* Menu Icons */}
            <ul className="menu_icon d-flex flex-wrap">
              {/* Search */}
              <li>
                <button
                  type="button"
                  className="menu_search"
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <i className="far fa-search"></i>
                </button>

                <div className={`fp__search_form ${searchOpen ? 'active' : ''}`}>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <span
                      className="close_search"
                      onClick={() => setSearchOpen(false)}
                    >
                      <i className="far fa-times"></i>
                    </span>
                    <input
                      type="text"
                      placeholder={searchPlaceholder}
                    />
                    <button type="submit">search</button>
                  </form>
                </div>
              </li>

              {/* Cart */}
              <li>
                <a className="cart_icon" href="#">
                  <i className="fas fa-shopping-basket"></i>
                  {cartCount > 0 && <span>{cartCount}</span>}
                </a>
              </li>

              {/* User */}
              <li>
                <Link to={userLink}>
                  <i className="fas fa-user"></i>
                </Link>
              </li>

              {/* Reservation */}
              {reservation?.text && (
                <li>
                  <a
                    className="common_btn"
                    href={reservation.url}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    {reservation.text}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* =============================
          MENU END
      ============================== */}
    </>
  );
}
