import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="app-container">

      <Header isAuthenticated={isAuthenticated} />

      <div className="main-container">
        
        {isAuthenticated && (
          <Sidebar onToggle={setSidebarOpen} />
        )}

        <div
          className="content-area"
          style={{
            marginLeft: isAuthenticated
              ? sidebarOpen
                ? "280px"
                : "80px"
              : "0",
            transition: "all 0.3s ease"
          }}
        >
          <Outlet /> {/* This will render the matched child route component */}
        </div>

      </div>

      <Footer
        sidebarOpen={sidebarOpen}
        isAuthenticated={isAuthenticated}
      />

    </div>
  );
};

export default Layout;