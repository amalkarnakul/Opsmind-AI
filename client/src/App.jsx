import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Pricing from './pages/Pricing'
import Workspace from './pages/Workspace'
import Contact from './pages/Contact'
import Docs from './components/Docs'
import Feature from './pages/Feature'
import Chat from './pages/Chat'
import FeatureDetail from './pages/FeatureDetail'
import Profile from './pages/Profile'

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const hideChrome = ['/login', '/register'].includes(pathname);
  return (
    <>
      {!hideChrome && <Navbar />}
      {children}
      {!hideChrome && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/features/:slug" element={<FeatureDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/chat" element={<Workspace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App
