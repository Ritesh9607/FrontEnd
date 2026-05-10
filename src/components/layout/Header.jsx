import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, LogIn, LogOut } from 'lucide-react';
import './Header.css';

export const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="header-logo"><BarChart3 size={32} /></div>
          <div className="brand-text">
            <h1>FinanceGov</h1>
            <p>{isAuthenticated ? "Administrative Portal" : "National Financial Regulation"}</p>
          </div>
        </div>

        <div className="header-info">
          <button className="login-btn" onClick={handleAuthAction}>
            {isAuthenticated ? (
              <>
                <LogOut size={20} className="me-2" />
                <span>Logout</span>
              </>
            ) : (
              <>
                <LogIn size={20} className="me-2" />
                <span>Login</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;