import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Sidebar from "./Sidebar"; 
import "./Layout.css";

const Layout = () => {
  const location = useLocation();
  // Standardized to 'token'
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sync auth state on location change (useful for login/logout transitions)
  useEffect(() => {
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
      {/* Header is fixed at z-index 9999 */}
      <Header isAuthenticated={isAuthenticated} />

      <div className="layout-body">
        {isAuthenticated && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
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