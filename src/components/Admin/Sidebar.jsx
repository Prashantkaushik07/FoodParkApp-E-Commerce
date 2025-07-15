// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Sidebar() {
  return (
    <div style={styles.open}>
      <div style={styles.header}>
        <h1 style={styles.title}>Nodejs Storefront</h1>
        {/* only show on md-and-below devices */}
        <div className="d-block d-md-none">
          <Form>
            <Form.Check type="switch" id="example-switch" label="" />
          </Form>
        </div>
      </div>

      <ul style={styles.menu}>
        {[
          { to: 'dashboard',        label: 'Dashboard' },
          { to: 'sliders',          label: 'Manage Sliders' },
          { to: 'features',         label: 'Why Choose Us' },
          { to: 'daily-offer',      label: 'Daily Offer' },
          { to: 'header-settings',  label: 'Header / Nav Settings' },
          { to: 'menu',             label: 'Menu Management' },
          { to: 'chefs',            label: 'Manage Chefs' },
          { to: 'team-section',     label: 'Team Section' },
          { to: 'testimonials',     label: 'Testimonials' },
          { to: 'testimonial-section', label: 'Testimonial Section' },
          { to: 'counter-settings', label: 'Counter Section' },
          { to: 'footer-settings',  label: 'Footer Settings' },
          { to: 'reports',          label: 'Reports' },
        ].map(({ to, label }) => (
          <li key={to} style={styles.menuItem}>
            <NavLink
              to={to}
              end
              style={({ isActive }) =>
                isActive
                  ? { ...styles.link, ...styles.active }
                  : styles.link
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  open:      { width: 250, background: '#2c3e50', color: '#fff', height: 'auto', padding: 10 },
  header:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title:     { margin: 0, fontSize: 23 },
  menu:      { listStyle: 'none', padding: 0, margin: 0 },
  menuItem:  { marginBottom: 8 },
  link:      {
    display: 'block',
    color: '#fff',
    padding: '10px 15px',
    textDecoration: 'none',
    borderRadius: '10px',
    transition: 'background 0.2s',
  },
  active:    { background: '#1abc9c' },
};
