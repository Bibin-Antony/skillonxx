import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, GraduationCap } from 'lucide-react';
import logo from "../../assets/logo/logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('student');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [resetSent, setResetSent] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Define your API URLs like in your LoginPage
  const devUrl = "https://skillonx-server.onrender.com";
  const prodUrl = "https://skillonx-server.onrender.com";
  const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${devUrl}/${userType}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Reset code sent to your email' });
        setResetSent(true);
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to send reset code' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${baseUrl}/${userType}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          resetToken,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Password reset successful!' });
        setTimeout(() => {
          navigate('/LoginPage');
        }, 2000);
      } else {
        setStatus({ type: 'error', message: data.message || 'Failed to reset password' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] flex items-center justify-center p-4">
      <div className="bg-[#112240]/30 backdrop-blur-lg rounded-xl p-8 w-full max-w-md mx-auto shadow-2xl border border-blue-300/10">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="w-36 md:w-52 h-auto object-cover" />
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-100 mb-2">
              {resetSent ? 'Reset Password' : 'Forgot Password'}
            </h2>
            <p className="text-blue-300/70">
              {resetSent
                ? 'Enter the code sent to your email'
                : 'Enter your email to receive a reset code'}
            </p>
          </div>

          {!resetSent ? (
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-blue-100 text-sm font-medium mb-2 block">User Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className={`
                    flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer
                    border transition-all duration-200 
                    ${userType === 'student'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                      : 'border-blue-300/30 bg-[#0a192f]/50 text-blue-300 hover:border-blue-400'
                    }`}>
                    <input
                      type="radio"
                      value="student"
                      checked={userType === 'student'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-2">
                      <GraduationCap className={`w-5 h-5 ${userType === 'student' ? 'text-blue-500' : 'text-blue-300/70'}`} />
                      <span className="font-medium">Student</span>
                    </div>
                  </label>

                  <label className={`
                    flex items-center justify-center px-4 py-3 rounded-lg cursor-pointer
                    border transition-all duration-200
                    ${userType === 'university'
                      ? 'border-blue-500 bg-blue-500/10 text-blue-100'
                      : 'border-blue-300/30 bg-[#0a192f]/50 text-blue-300 hover:border-blue-400'
                    }`}>
                    <input
                      type="radio"
                      value="university"
                      checked={userType === 'university'}
                      onChange={(e) => setUserType(e.target.value)}
                      className="hidden"
                    />
                    <div className="flex items-center space-x-2">
                      <Building2 className={`w-5 h-5 ${userType === 'university' ? 'text-blue-500' : 'text-blue-300/70'}`} />
                      <span className="font-medium">University</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-blue-100 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-blue-100 text-sm font-medium">Reset Code</label>
                <input
                  type="text"
                  value={resetToken}
                  onChange={(e) => setResetToken(e.target.value)}
                  placeholder="Enter reset code"
                  className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-blue-100 text-sm font-medium">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          {status.message && (
            <div className={`p-3 rounded-lg text-sm ${status.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
              }`}>
              {status.message}
            </div>
          )}

          <p className="text-center text-blue-100 text-sm">
            Remember your password?{' '}
            <Link to="/LoginPage" className="text-blue-300 hover:text-blue-200">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;