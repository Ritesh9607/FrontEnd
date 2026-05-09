import React, { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import Footer from "./Footer";

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
          {children}
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