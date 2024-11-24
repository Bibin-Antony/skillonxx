// components/Admin/AdminLogin.jsx
import React, { useState } from "react";
import { CircleDot, Boxes, Stars, Cloud, Moon, Sun, Sparkles, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/AuthContext";
import logo from "../../assets/logo/logo.png";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("https://skillonx-server.onrender.com/admin/login", {
        email,
        password,
      });

      if (response.data.success) {
        const { token, user } = response.data;

        // Format user data to match your existing structure
        const userData = {
          ...user,
          userType: 'admin'
        };

        // Use your existing login function
        login(token, userData);

        // Navigate to admin dashboard
        navigate('/admin');
      }
    } catch (err) {
      // console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // Floating animation elements with different speeds
  const FloatingElement = ({ children, className }) => (
    <div className={`absolute ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen pt-10 md:pt-0 bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] flex items-center justify-center relative overflow-hidden px-4">
      {/* Animated background elements */}
      <FloatingElement className="top-20 left-20 text-blue-300/20 animate-bounce">
        <CircleDot size={24} />
      </FloatingElement>
      {/* ... other floating elements ... */}

      {/* Main container */}
      <div className="bg-[#112240]/30 backdrop-blur-lg rounded-xl p-8 w-full max-w-md mx-auto shadow-2xl border border-blue-300/10">
        <div className="flex flex-col space-y-8">
          {/* Logo section */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Logo"
              className="w-36 md:w-52 h-auto object-cover"
            />
          </div>

          {/* Admin sign in text */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-100">Admin Portal</h2>
            <p className="text-blue-300/70 mt-2">Access the admin dashboard</p>
          </div>

          {/* Login form */}
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-blue-100 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Admin Email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-blue-100 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Admin Password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-blue-400 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;