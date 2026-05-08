import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import Sidebar from "./Sidebar";  // ✅ corrected import (no {} if default export)
import "./Layout.css";

const Layout = () => {

  // ✅ Check authentication
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className={`layout ${!isAuthenticated ? "no-sidebar" : ""}`}>

      {/* ✅ HEADER */}
      <Header isAuthenticated={isAuthenticated} />

      {/* ✅ BODY */}
      <div className="layout-body">

        {/* ✅ SIDEBAR ONLY IF LOGGED IN */}
        {isAuthenticated && <Sidebar />}

        {/* ✅ MAIN CONTENT */}
        <main
          className={`main-content ${
            !isAuthenticated ? "full-width" : ""
          }`}
        >
          <Outlet />
        </main>

      </div>

      {/* ✅ FOOTER */}
      <Footer />

    </div>
  );
};

export default Layout;