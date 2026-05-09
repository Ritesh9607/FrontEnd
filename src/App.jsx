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
        {/* ✅ No Layout (Auth Pages) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ With Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demo1" element={<h2>Dashboard Page</h2>} />
                <Route path="/demo2" element={<h2>Page 2</h2>} />
              </Routes>
            </Layout>
          }
        />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;