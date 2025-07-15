import React from 'react';
import { Routes, Route } from 'react-router-dom';  // Import Routes and Route from react-router-dom

import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import BannerSlider from './components/BannerSlider';
import WhyChooseUs from './components/WhyChooseUs';
import DailyOffer from './components/DailyOffer';
import MenuItems from './components/MenuItems';
import TeamSection from './components/TeamSection';
import DownloadApp from './components/DownloadApp';
import TestimonialSection from './components/Testimonial';
import CounterSection from './components/CounterSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

// Import Admin components
import AdminDashboard from './components/Admin/AdminDashboard';  // Admin dashboard for managing sliders
import AdminLogin from './components/Admin/AdminLogin';  // Admin login page
import Sidebar from './components/Admin/Sidebar';

// Import PrivateRoute for protecting admin pages
import PrivateRoute from './components/Admin/PrivateRoute';  // Correct import path for PrivateRoute

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <>
          <Topbar />
          <Navbar />
          <BannerSlider />
          <WhyChooseUs />
          <DailyOffer />
          <MenuItems />
          <TeamSection />
          <DownloadApp />
          <TestimonialSection />
          <CounterSection />
          <BlogSection />
          <Footer />
          <ScrollToTopButton />
        </>
      } />
        
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Route */}
      <Route path="/admin/*" element={
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
