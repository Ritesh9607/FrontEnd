import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, LogOut, LogIn, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

export const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/" || location.pathname === "/home";

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); 
  };

  const handleLogin = () => {
    // ✅ Fast navigation (no reload)
    navigate('/login'); 
  };

  return (
    <motion.header
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="header-container">
        <div className="header-brand">
          {/* Smart Back Button */}
          {isAuthenticated && !isHome && (
            <motion.button 
              className="btn-header-back"
              onClick={() => navigate(-1)}
              whileHover={{ x: -3 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '15px',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={18} />
            </motion.button>
          )}

          <motion.div
            className="header-logo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 size={32} />
          </motion.div>
          <div className="brand-text">
            <h1>FinanceGov</h1>
            <p>{isAuthenticated ? "Program Manager" : "National Financial Regulation"}</p>
          </div>
        </div>

        <div className="header-info">
          {isAuthenticated ? (
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          ) : (
            /* ✅ Restored the Original Big Yellow Button Style */
            <button 
              className="login-btn" 
              onClick={handleLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 25px',       /* Larger Padding */
                backgroundColor: '#fcbf49', /* Original Yellow */
                color: '#143859',           /* Original Dark Blue */
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',           /* Bigger Font */
                fontWeight: '700',          /* Boldness */
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <LogIn size={20} />
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;