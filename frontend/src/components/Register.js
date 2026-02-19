import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    userid: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.userid.trim()) {
      newErrors.userid = 'User ID is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register/`, {
        username: formData.username,
        userid: formData.userid,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
        confirm_password: formData.confirm_password
      });

      if (response.status === 201) {
        alert('Registration successful! Redirecting to login...');
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        if (errorData.error) {
          setErrors({ submit: errorData.error });
        } else {
          setErrors({ submit: 'Registration failed. Please try again.' });
        }
      } else {
        setErrors({ submit: 'Network error. Please check your connection.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="geometric-shape shape-1"></div>
      <div className="geometric-shape shape-2"></div>
      <div className="geometric-shape shape-3"></div>
      
      <div className="glass-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join us and get started</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
              placeholder="Enter your username"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="userid">User ID</label>
            <input
              type="text"
              id="userid"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              className={errors.userid ? 'input-error' : ''}
              placeholder="Enter your user ID"
            />
            {errors.userid && <span className="error-message">{errors.userid}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className={errors.phone_number ? 'input-error' : ''}
              placeholder="Enter your phone number"
            />
            {errors.phone_number && <span className="error-message">{errors.phone_number}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className={errors.confirm_password ? 'input-error' : ''}
              placeholder="Confirm your password"
            />
            {errors.confirm_password && <span className="error-message">{errors.confirm_password}</span>}
          </div>

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="auth-link">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
