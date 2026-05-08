import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import AdminSidebar from "./AdminSidebar"; 
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Refresh auth state whenever location changes
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [location]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const layoutStatusClass = !isAuthenticated 
    ? "no-sidebar" 
    : isSidebarOpen 
      ? "sidebar-expanded" 
      : "sidebar-collapsed";

  return (
    <div className={`layout-wrapper ${layoutStatusClass}`}>
      <Header isAuthenticated={isAuthenticated} />

      <div className="layout-body">
        {/* Force check for /admin/ in path if token is being tricky */}
        {(isAuthenticated || location.pathname.includes('/admin')) && (
          <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        <main className="main-content">
          <div className="content-inner">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;