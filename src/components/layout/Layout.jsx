import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {

  // ✅ SIDEBAR STATE
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ✅ AUTH STATE (FIXED - STABLE)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // ✅ LOAD AUTH ONCE (important)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    setIsAuthenticated(!!token);
    setIsAdmin(role === "ROLE_ADMIN");
  }, []);

  return (
    <div className="app-container">

      {/* ✅ HEADER */}
      <Header isAuthenticated={isAuthenticated} />

      <div className="main-container">

        {/* ✅ SHOW SIDEBAR ONLY FOR ADMIN */}
        {isAuthenticated && isAdmin && (
          <Sidebar onToggle={setSidebarOpen} />
        )}

        {/* ✅ CONTENT */}
        <div
          className="content-area"
          style={{
            marginLeft: isAuthenticated && isAdmin
              ? sidebarOpen
                ? "280px"
                : "80px"
              : "0",
            transition: "all 0.3s ease"
          }}
        >
          <Outlet />
        </div>

      </div>

      {/* ✅ FOOTER */}
      <Footer
        sidebarOpen={sidebarOpen}
        isAuthenticated={isAuthenticated}
      />

    </div>
  );
};

export default Layout;