import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Sidebar } from "../common/Sidebar"; // Adjust this path if your sidebar is elsewhere
import "./Layout.css";

export const MainLayout = ({ children, isAuthenticated }) => {
  return (
    <div className="layout">
      {/* Header handles the Login/Logout button logic */}
      <Header isAuthenticated={isAuthenticated} />

      <div className="layout-body d-flex">
        {/* Sidebar only takes up space if the user is logged in */}
        {isAuthenticated && <Sidebar />}
        
        {/* 'flex-grow-1' makes this area take up all remaining screen space */}
        <main className={`flex-grow-1 ${!isAuthenticated ? 'centered-home' : 'dashboard-content'}`}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;