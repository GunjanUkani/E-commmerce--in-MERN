// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useHistory, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

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
      const decodedToken = jwtDecode(token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', decodedToken.role); // Store the user's role in local storage
      console.log('User logged in successfully!');

      // Redirect to user dashboard or admin dashboard based on the user's role
      if (decodedToken.role === 'admin') {
        navigate('/admin/dashboard');
      } else 
      if (decodedToken.role === 'user')
      {
        navigate('/user/dashboard');
      }
        else {
            navigate('/login');
        }
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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

export default Login;
