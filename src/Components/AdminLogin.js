// AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log('Admin logged in successfully!'); 
        window.location.href = 'admin/dashboard';
      // Redirect to admin dashboard or handle admin-specific routes
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
      window.location.href = '/admin/login';
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        {/* ... form inputs (email, password) */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" onChange={handleChange} />
                </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
