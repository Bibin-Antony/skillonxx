import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  
  // Get email and verification code from multiple possible sources
  const { email: stateEmail, accountType: stateAccountType } = location.state || {};
  const urlEmail = searchParams.get('email') || params.email;
  const urlCode = searchParams.get('code') || params.code;
  const urlAccountType = searchParams.get('accountType'); // Add this line

  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [autoVerifying, setAutoVerifying] = useState(false);

  const email = urlEmail || stateEmail;
  const accountType = urlAccountType || stateAccountType; // Use combined account type

  useEffect(() => {
    const verifyFromUrl = async () => {
      if (urlEmail && urlCode) {
        setAutoVerifying(true);
        setIsLoading(true);
        try {
          const endpoint = accountType === 'university'
            ? 'https://skillonx-server.onrender.com/university/verify-email'
            : 'https://skillonx-server.onrender.com/student/verify-email';
            console.log('Verifying with endpoint:', endpoint); // Debug log
            console.log('Account type:', accountType);
          const response = await axios.post(endpoint, {
            email: urlEmail,
            verificationCode: urlCode,
          });

          if (response.status === 200) {
            navigate('/LoginPage', { 
              state: { 
                verificationSuccess: true,
                message: 'Email verified successfully! Please log in.'
              }
            });
          }
        } catch (error) {
          setErrorMessage('Invalid or expired verification link. Please try using the verification code instead.');
          setAutoVerifying(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    verifyFromUrl();
  }, [urlEmail, urlCode, accountType, navigate]);

  const handleVerify = async () => {
    if (!code) {
      setErrorMessage('Please enter the verification code');
      return;
    }
    if (!accountType) {
      setErrorMessage('Account type not specified. Please try registering again.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = accountType === 'university'
        ? 'https://skillonx-server.onrender.com/university/verify-email'
        : 'https://skillonx-server.onrender.com/student/verify-email';

      const response = await axios.post(endpoint, {
        email,
        verificationCode: code,
      });

      if (response.status === 200) {
        navigate('/LoginPage', { 
          state: { 
            verificationSuccess: true,
            message: 'Email verified successfully! Please log in.'
          }
        });
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state when auto-verifying
  if (autoVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] relative overflow-hidden px-4 py-6 lg:p-0 flex items-center justify-center">
        <div className="w-full max-w-md bg-[#112240]/30 backdrop-blur-lg rounded-xl shadow-2xl border border-blue-300/10 p-6 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-blue-100">Verifying your email address...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0a192f] relative overflow-hidden px-4 py-6 lg:p-0 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#112240]/30 backdrop-blur-lg rounded-xl shadow-2xl border border-blue-300/10 p-6">
        <h2 className="text-2xl font-bold text-blue-100 mb-4">Verify Your Email</h2>
        <p className="text-blue-300 mb-4">
          {email ? (
            <>We've sent a verification code to {email}. Please enter the code below to verify your account.</>
          ) : (
            <>Please enter the verification code sent to your email address.</>
          )}
        </p>
        <input
          type="text"
          placeholder="Enter verification code"
          className="w-full px-4 py-2 rounded-lg bg-[#0a192f]/50 border border-blue-300/30 text-blue-100 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base mb-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isLoading}
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
        )}
        <button
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm md:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          onClick={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify Email'
          )}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;