// src/components/Admin/TopNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button, Modal } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import confetti from 'canvas-confetti';
// import './TopNavbar.css';

const ROUTE_LABELS = {
  '/dashboard':        'Dashboard',
  '/sliders':          'Slider Management',
  '/features':         'Why Choose Us',
  '/daily-offer':      'Daily Offers',
  '/header-settings':  'Header & Nav Settings',
  '/menu':             'Menu Management',
  '/chefs':            'Chef Management',
  '/team-section':     'Team Section',
  '/testimonials':     'Testimonials',
  '/testimonial-section': 'Testimonial Section',
  '/counter-settings': 'Counter Settings',
  '/footer-settings':  'Footer Settings',
  '/reports':          'Reports',
};

export default function TopNavbar() {
  const location = useLocation();
  const [showThanks, setShowThanks] = useState(false);
  const [darkMode, setDarkMode]     = useState(false);

  // initialize from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) setDarkMode(saved === 'true');
  }, []);

  // apply to body & persist
  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
    setShowThanks(true);
  };

  useEffect(() => {
    if (showThanks) {
      const timer = setTimeout(() => {
        window.location.href = '/admin/login';
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showThanks]);

  // derive title from current path
  const basePath = location.pathname.replace(/^\/admin/, '');
  const title    = ROUTE_LABELS[basePath] || 'Admin Dashboard';

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-0 p-0">
        <Container fluid>
          <Navbar.Brand>
            <h1 className="text-gradient">{title}</h1>
          </Navbar.Brand>

          <Nav className="ms-auto align-items-center">
            {/* Theme toggle */}
            <Button
              variant="outline-secondary"
              className="me-2"
              onClick={() => setDarkMode(dm => !dm)}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </Button>

            {/* Logout */}
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Modal show={showThanks} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center">
          <h4>🎉 Thank you for using our services!</h4>
          <p>We look forward to seeing you again soon.</p>
          <img
            src="/images/mickey-mouse-smiling.gif"
            alt="Cartoon handshake"
            className="thankyou-cartoon"
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
