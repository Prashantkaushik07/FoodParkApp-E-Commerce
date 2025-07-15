// src/components/Admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar                    from './Sidebar';
import TopNavbar                  from './TopNavbar';
import SliderEditor               from './SliderEditor';
import FeatureEditor              from './FeatureEditor';
import DailyOfferEditor           from './DailyOfferEditor';
import HeaderEditor               from './HeaderEditor';
import ChefsList                  from './ChefsList';
import TeamSectionForm            from './TeamSectionForm';
import TestimonialsList           from './TestimonialsList';
import TestimonialForm            from './TestimonialForm';
import TestimonialSectionForm     from './TestimonialSectionForm';
import CounterSettingsEditor      from './CounterSettingsEditor';
import FooterSettingsEditor       from './FooterSettingsEditor';
import Dashboard                  from './dashboard';
import MenuManage                 from './MenuManage';
import Reports                    from './Reports';
import './global.css';


export default function AdminDashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  // toggle body class and persist
  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const mainStyles = {
    flex: 1,
    padding: 20,
    backgroundColor: darkMode ? '#121212' : '#ecf0f1',
    color:           darkMode ? '#eee'    : '#212529'
  };

  return (
    <div style={styles.container} className="content-wrapper">
      {/* Sidebar always visible */}
      <Sidebar />

      <div style={styles.contentWrapper}>
        {/* Pass theme props to TopNavbar */}
        <TopNavbar
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(d => !d)}
        />

        {/* main page content */}
        <main style={mainStyles}>
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"        element={<Dashboard />} />
            <Route path="sliders"          element={<SliderEditor />} />
            <Route path="features"         element={<FeatureEditor />} />
            <Route path="daily-offer"      element={<DailyOfferEditor />} />
            <Route path="header-settings"  element={<HeaderEditor />} />
            <Route path="menu"             element={<MenuManage />} />
            <Route path="chefs"            element={<ChefsList />} />
            <Route path="team-section"     element={<TeamSectionForm />} />
            <Route path="testimonials"     element={<TestimonialsList />} />
            <Route
              path="testimonials/new"
              element={
                <TestimonialForm
                  initial={{}}
                  onSuccess={() => navigate('testimonials')}
                  onCancel={() => navigate('testimonials')}
                />
              }
            />
            <Route
              path="testimonials/:id/edit"
              element={
                <TestimonialForm
                  onSuccess={() => navigate('testimonials')}
                  onCancel={() => navigate('testimonials')}
                />
              }
            />
            <Route path="testimonial-section" element={<TestimonialSectionForm />} />
            <Route path="counter-settings"      element={<CounterSettingsEditor />} />
            <Route path="footer-settings"       element={<FooterSettingsEditor />} />
            <Route path="reports"               element={<Reports />} />
            <Route path="*"                     element={<Navigate to="sliders" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

const styles = {
  container:     { display: 'flex', minHeight: '100vh' },
  contentWrapper:{ flex: 1, display: 'flex', flexDirection: 'column' },
};
