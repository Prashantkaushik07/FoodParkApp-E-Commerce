// src/components/Layout.jsx
import React from 'react';
// import Topbar from './Topbar';
import Header from './Header';
// import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      {/* <Topbar /> */}
        <Header />
      {/* <Navbar /> */}
      <Outlet /> {/* This will render the nested route content */}
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
