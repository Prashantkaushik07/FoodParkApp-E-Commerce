import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// import Topbar from './components/Topbar';
import Header from './components/Header';
// import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

// Public page components
import BannerSlider from './components/BannerSlider';
import WhyChooseUs from './components/WhyChooseUs';
import DailyOffer from './components/DailyOffer';
import MenuItems from './components/MenuItems';
import TeamSection from './components/TeamSection';
import DownloadApp from './components/DownloadApp';
import TestimonialSection from './components/Testimonial';
import CounterSection from './components/CounterSection';
import BlogSection from './components/BlogSection';

// Admin components
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';
import PrivateRoute from './components/Admin/PrivateRoute';

function PublicLayout() {
  return (
    <>
      {/* <Topbar /> */}
      <Header />
      {/* <Navbar /> */}
      <Outlet /> {/* Nested public routes will render here */}
      <Footer />
      <ScrollToTopButton />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Routes with Header/Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={
          <>
            <BannerSlider />
            <WhyChooseUs />
            <DailyOffer />
            <MenuItems />
            <TeamSection />
            <DownloadApp />
            <TestimonialSection />
            <CounterSection />
            <BlogSection />
          </>
        } />
        {/* You can add more public pages here */}
      </Route>

      {/* Admin Routes without Header/Footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
