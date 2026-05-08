import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LogIn, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";

  return (
    <motion.header 
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
    >
      <div className="header-container">
        <div className="header-brand">
          {isAuthenticated && !isHome && (
            <button className="btn-header-back" onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="header-logo" onClick={() => navigate('/')}>
            <BarChart3 size={32} />
          </div>
          <div className="brand-text">
            <h1>FinanceGov</h1>
            <p>{isAuthenticated ? "Administrative Portal" : "National Financial Regulation"}</p>
          </div>
        </div>

        <div className="header-info">
          {/* Updated Login Button */}
{!isAuthenticated ? (
  <button 
    className="login-btn fw-bold" 
    onClick={() => navigate('/login')}
    style={{ 
      backgroundColor: '#facc15', 
      color: '#000', 
      border: 'none',
      padding: '0.5rem 1.5rem',
      borderRadius: '6px',
      display: 'flex',
      alignitems: 'center',
      gap: '8px'
    }}
  >
    <LogIn size={20} />
    <span>Login</span>
  </button>
) : (
  <div className="admin-status-pill">
    <div className="status-dot"></div>
    <span>Admin Active</span>
  </div>
)}
        </div>
      </div>
    </motion.header>
  );
};