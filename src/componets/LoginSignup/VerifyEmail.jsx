import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const location = useLocation();
  const { email, accountType } = location.state || {};
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerify = async () => {
          const devUrl = 'http://localhost:5000'
          const prodUrl = 'https://skillonx-server.onrender.com'

    try {
      const endpoint = accountType === 'university'
        ? 'https://skillonx-server.onrender.com/university/verify-email'
        : 'https://skillonx-server.onrender.com/student/verify-email';

      const response = await axios.post(endpoint, {
        email,
        verificationCode: code,
      });

      if (response.status === 200) {
        // Email verified successfully
        // console.log("saved successfully")
        setCode(true);
        navigate('/LoginPage');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      setErrorMessage('An error occurred while verifying the email. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] relative overflow-hidden px-4 py-6 lg:p-0 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#112240]/30 backdrop-blur-lg rounded-xl shadow-2xl border border-blue-300/10 p-6">
        <h2 className="text-2xl font-bold text-blue-100 mb-4">Verify Your Email</h2>
        <p className="text-blue-300 mb-4">
          We've sent a 6-digit verification code to your email address. Please enter the code below to verify your account.
        </p>
        <input
          type="text"
          placeholder="Enter verification code"
          className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base mb-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
        <button
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm md:text-base font-medium"
          onClick={handleVerify}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;