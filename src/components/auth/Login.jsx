import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import './Auth.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await authService.login(credentials);
      toast.success(response.message || "Login Successful!");
      
      // ✅ FIX: Backend returns "/api/admin/dashboard", 
      // React needs "/admin/dashboard"
      if (response.endpoint) {
        const cleanPath = response.endpoint.replace('/api', '');
        navigate(cleanPath);
      } else {
        navigate('/dashboard');
      }
      
    } catch (err) {
      toast.error(err.message || "Invalid credentials or Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container" style={{ position: 'relative' }}>
      <button 
        className="auth-back-link" 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: '20px', left: '20px', border: 'none',
          background: 'none', color: '#1e4d8b', fontWeight: '600',
          display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
        }}
      >
        <ArrowLeft size={18} /> Back to Home
      </button>

      <div className="login-card shadow-lg p-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Finance<span className="text-warning">Gov</span></h2>
          <p className="text-muted">Sign in to your secure portal</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email" name="email" className="form-control"
              placeholder="e.g. ritesh@gov.in" required onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password" name="password" className="form-control"
              placeholder="••••••••" required onChange={handleChange}
            />
          </div>
          <button 
            type="submit" className="btn btn-primary w-100 py-2 fw-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Authenticating..." : "LOGIN"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/forgot-password" style={{ fontSize: '0.9rem' }}>Forgot Password?</Link>
          <hr />
          <p className="mb-0">New user? <Link to="/register">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;