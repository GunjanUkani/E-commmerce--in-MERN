// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Outlet, Redirect, useNavigate } from 'react-router-dom';
import UserRegistration from './Components/UserRegistration';
import AdminRegistration from './Components/AdminRegistration';
import UserLogin from './Components/UserLogin';
import AdminLogin from './Components/AdminLogin';
import UserDashboard from './Components/UserDashboard';
import AdminDashboard from './Components/AdminDashboard';
import Login from './Components/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token to get the user role
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsAuthenticated(true);
      setIsAdmin(decodedToken.role === 'admin');
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/register/user">User Registration</Link>
            </li>
            <li>
              <Link to="/register/admin">Admin Registration</Link>
            </li>
            <li>
              <Link to="/login/user">User Login</Link>
            </li>
            <li>
              <Link to="/login/admin">Admin Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* Public Routes */}
          <Route path="/register/user" element={<UserRegistration />} />
          <Route path="/register/admin" element={<AdminRegistration />} />
          <Route path="/login/user" element={<UserLogin handleLogin={handleLogin} />} />
          <Route path="/login/admin" element={<AdminLogin handleLogin={handleLogin} />} />

          {/* Dashboard Routes */}
          {isAuthenticated && isAdmin ? (
            <Route path="admin/dashboard" element={<AdminDashboard handleLogout={handleLogout} />} />
          ) : null}
          {isAuthenticated && !isAdmin ? (
            <Route path="/user/dashboard" element={<UserDashboard handleLogout={handleLogout} />} />
          ) : null}

          {/* Redirect to login page if none of the routes match */}
          <Route path="*" element={<div className="text-2xl text-red-500">NOT FOUND</div>} />
        </Routes>
      </div>
  );
};

export default App;
