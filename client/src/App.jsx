import React, { useState, useEffect, useCallback, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./layout";
import SideBar from "./widgets/Sidebar";
import "./App.css";

import Home from "./pages/dashboard/Home";
import RegisterProduct from "./pages/dashboard/RegisterProduct";
import ViewProducts from "./pages/dashboard/ViewProducts";
import TrackProduct from "./pages/dashboard/TrackProduct";
import ViewBlockchain from "./pages/dashboard/ViewBlockchain";
import FAQ from "./pages/dashboard/FAQ";
import About from "./pages/dashboard/About";
import Contact from "./pages/dashboard/Contact";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import Landing from "./pages/landing";
import IPR from "./pages/dashboard/IPR";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const previousWidthRef = useRef(-1);

  const updateWidth = useCallback(() => {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isMobile = width <= widthLimit;
    const wasMobile = previousWidthRef.current <= widthLimit;

    if (isMobile !== wasMobile) {
      setIsOpen(!isMobile);
    }

    previousWidthRef.current = width;
  }, []);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [updateWidth]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="App wrapper">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<DashboardLayout isOpen={isOpen} toggle={toggle} />} />
        </Routes>
    </div>
  );
};

const DashboardLayout = ({ isOpen, toggle }) => (
  <>
    <SideBar toggle={toggle} isOpen={isOpen} />
    <Layout isOpen={isOpen} toggle={toggle}>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="products/ipr/:blockhash" element={<IPR />} />
        <Route path="products/add" element={<RegisterProduct />} />
        <Route path="products/all" element={<ViewProducts />} />
        <Route path="products/track" element={<TrackProduct />} />
        <Route path="blockchain/view" element={<ViewBlockchain />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </Layout>
  </>
);

export default App;
