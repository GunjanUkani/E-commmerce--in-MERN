// UserLogin.js
import React, { useState } from 'react';
import axios from 'axios';

const UserLogin = () => {
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
      console.log('User logged in successfully!');
        window.location.href = '/user/dashboard';
      // Redirect to user dashboard or handle user-specific routes
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
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

export default UserLogin;
