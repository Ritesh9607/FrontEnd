import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingBar from "react-top-loading-bar";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import "./App.css";

// Pages
import Home from "./dashboard/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UsersPage from "./roles/Admin/riteshModule1/UsersPage";
import UserDetails from "./roles/Admin/riteshModule1/UserDetails";
import EditUser from "./roles/Admin/riteshModule1/EditUser";
import AdminDashboard from "./roles/Admin/riteshModule1/AdminDashboard";
import Analytics from "./roles/Admin/riteshModule1/Analytics";
import CreateOfficer from "./roles/Admin/riteshModule1/CreateOfficer";

// Layout
import Layout from "./components/layout/Layout";

// Preloader
import Preloader from "./components/common/Preloader";

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  if (loading) {
    return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <Router>
      <LoadingBar
        color="#facc15"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        height={3}
      />

      <Routes>

        {/* ✅ Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Layout Wrapper */}
        <Route path="/" element={<Layout />}>

          {/* ✅ Nested Pages */}
          <Route index element={<Home />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/users" element={<UsersPage />} />
          <Route path="admin/users/:id" element={<UserDetails />} />
          <Route path="admin/analytics" element={<Analytics />} />
          <Route path="admin/create-officer" element={<CreateOfficer />} />
          
          {/* ✅ ✅ FIXED EDIT ROUTE */}
          <Route path="admin/users/edit/:id" element={<EditUser />} />

        </Route>

      </Routes>

      {/* ✅ Toast */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ maxWidth: "500px", minWidth: "max-content" }}
      />
    </Router>
  );
}

export default App;
