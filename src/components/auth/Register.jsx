import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import { toast } from 'react-toastify';
import { authService } from '../../services/authService';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await authService.register(formData);
      toast.success(response || "Registration Successful!");
      navigate('/login');
    } catch (err) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container" style={{ position: 'relative' }}>
      {/* --- BACK TO HOME BUTTON --- */}
      <button 
        className="auth-back-link" 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          border: 'none',
          background: 'none',
          color: '#1e4d8b',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        <ArrowLeft size={18} /> Back to Home
      </button>

      <div className="login-card shadow-lg p-4">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Finance<span className="text-warning">Gov</span></h2>
          <p className="text-muted">Register for Citizen Services</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter your full name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="ritesh@example.com"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="10-digit mobile number"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a strong password"
              required
              onChange={handleChange}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 fw-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "REGISTER"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0">Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;