import React, { useEffect, useState } from "react";
import { CircleDot, Boxes, Stars, Cloud, Moon, Sun, Sparkles, Circle } from 'lucide-react';
import googleicon from "../../assets/Icons/google.png";
import logo from "../../assets/logo/logo.png";
import loginimage from "../../assets/illustrations/loginimage.png";
import { Link } from 'react-router-dom';
import axios from "axios";
const LoginPage = () => {
  
  useEffect(() => {
    // Smooth scroll polyfill
;
    window.scrollTo({ top: 0});

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store error messages
  const [loading, setLoading] = useState(false); // To manage loading state

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error on new attempt
    setError("");
    setLoading(true);
    const formdata ={
      email,
      password
    }
    console.log(formdata)
    const devUrl = "http://localhost:5000"
    const prodUrl="https://skillonx-website.onrender.com"
    try {
      const response = await axios.post("http://localhost:5000/check-type", {
        email,
        password,
      });

     
        const { token, redirectUrl } = response.data;
        console.log(token)

        console.log("Login successful!", redirectUrl);
        // const { redirectUrl } = response.data;
        
        window.location.href = redirectUrl;
        // window.location.href = "/student-dashboard"; // Redirect to dashboard or a protected page

    } catch (err) {
      console.log("check -type error", err);
      setError("Invalid email or password"); // Set error message if login fails
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
      {/* Expanded animated background elements */}
      <FloatingElement className="top-20 left-20 text-blue-300/20 animate-bounce">
        <CircleDot size={24} />
      </FloatingElement>
      <FloatingElement className="bottom-20 right-20 text-blue-300/20 animate-pulse">
        <Stars size={24} />
      </FloatingElement>
      <FloatingElement className="top-40 right-40 text-blue-300/20 animate-bounce">
        <Boxes size={24} />
      </FloatingElement>
      <FloatingElement className="bottom-40 left-40 text-blue-300/20 animate-pulse">
        <Moon size={24} />
      </FloatingElement>
      <FloatingElement className="top-60 left-60 text-blue-300/20 animate-bounce">
        <Sun size={24} />
      </FloatingElement>
      <FloatingElement className="bottom-60 right-60 text-blue-300/20 animate-pulse">
        <Cloud size={24} />
      </FloatingElement>
      <FloatingElement className="top-80 right-80 text-blue-300/20 animate-bounce">
        <Sparkles size={24} />
      </FloatingElement>
      <FloatingElement className="bottom-80 left-80 text-blue-300/20 animate-pulse">
        <Circle size={24} />
      </FloatingElement>

      {/* Main container with darker glassmorphism effect */}
      <div className="bg-[#112240]/30 backdrop-blur-lg rounded-xl p-8 w-full max-w-4xl mx-auto shadow-2xl border border-blue-300/10">
        <div className="flex flex-col md:flex-row gap-8 ">
          {/* Left side - Image placeholder */}
          <div className="flex-1 hidden  rounded-lg  overflow-hidden md:flex items-center justify-center">
            <img
              src={loginimage}
              alt="Login visual"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right side - Login form */}
          <div className="flex-1 flex flex-col">
            {/* Logo section */}
            <div className="flex justify-center mb-8">
              <div className="text-3xl font-bold text-blue-100"></div>
              <img
                src={logo}
                alt="Login visual"
                className="w-36 md:w-52 h-auto object-cover"
              />
            </div>

            {/* Login form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-blue-100 text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                   onChange={(e) => setEmail(e.target.value)}
                  
                  className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-blue-100 text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-blue-100">
                  <input type="checkbox" className="rounded border-blue-300/30 bg-[#0a192f]/50" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-300 hover:text-blue-200">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Sign In
              </button>

              <button className="w-full py-2 px-4 bg-[#0a192f] text-blue-100 rounded-lg flex items-center justify-center space-x-2 hover:bg-[#112240] transition-colors border border-blue-300/30">
                <img
                  src={googleicon}
                  alt="Google"
                  className="w-5 h-5"
                />
                <span>Sign In with Google</span>
              </button>

              <p className="text-center text-blue-100 text-sm">
                Don't have an account?{' '}
                <Link to="/SignupPage" className="text-blue-300 hover:text-blue-200">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
