import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import AdminSidebar from "./layout/AdminSidebar"; // Using your AdminSidebar
import "./Layout.css";

export const MainLayout = ({ children, isAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determine layout class based on auth and sidebar state
  const layoutClass = !isAuthenticated 
    ? "no-sidebar" 
    : isSidebarOpen 
      ? "sidebar-expanded" 
      : "sidebar-collapsed";

  return (
    <div className={`layout ${layoutClass}`}>
      {/* Header stays fixed at top: 80px height */}
      <Header isAuthenticated={isAuthenticated} />

      <div className="layout-body">
        {/* Only render Sidebar for authenticated Admins */}
        {isAuthenticated && (
          <AdminSidebar 
            isOpen={isSidebarOpen} 
            toggleSidebar={toggleSidebar} 
          />
        )}
        
        {/* Main content shifts based on sidebar state */}
        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>

      {/* Footer now shifts with the content for perfect centering */}
      <Footer />
    </div>
  );
};

export default MainLayout;