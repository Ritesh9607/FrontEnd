import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

// Styles
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import "./App.css";

// Components
import Preloader from "./components/common/Preloader";
import Layout from "./components/layout/Layout";
import Home from "./dashboard/home";
import AdminHome from "./dashboard/AdminHome";
import AdminSidebar from "./components/layout/AdminSidebar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const PageChangeLoader = ({ setProgress }) => {
  const location = useLocation();
  useEffect(() => {
    setProgress(40);
    const timer = setTimeout(() => setProgress(100), 400);
    return () => clearTimeout(timer);
  }, [location, setProgress]);
  return null;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Controls the collapse

  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <Router>
      <LoadingBar color="#facc15" progress={progress} onLoaderFinished={() => setProgress(0)} height={3} shadow={true} />
      <PageChangeLoader setProgress={setProgress} />

      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ ADMIN ROUTES WITH COLLAPSIBLE PUSH LOGIC */}
        <Route path="/admin/dashboard" element={
          <div className={`app-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="main-content-wrapper">
              {/* ✅ Passing isAuthenticated={true} fixes the Logout button */}
              <Layout isAuthenticated={true}>
                <AdminHome />
              </Layout>
            </main>
          </div>
        } />

        {/* CITIZEN ROUTES */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Router>
  );
}

export default App;