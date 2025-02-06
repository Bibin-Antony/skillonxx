import React from 'react';
import { Check, X } from 'lucide-react';

const validatePassword = (password) => {
  // Handle null/undefined password
  const pass = password || '';
  
  const hasLowerCase = /[a-z]/.test(pass);
  const hasUpperCase = /[A-Z]/.test(pass);
  const hasNumber = /\d/.test(pass);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
  const hasMinLength = pass.length >= 8;

  const issues = [];
  if (!hasLowerCase) issues.push('lowercase letter');
  if (!hasUpperCase) issues.push('uppercase letter');
  if (!hasNumber) issues.push('number');
  if (!hasSpecial) issues.push('special character');
  if (!hasMinLength) issues.push('minimum length of 8 characters');

  return {
    isValid: issues.length === 0,
    errors: issues.length > 0 ? [`Password must contain: ${issues.join(', ')}`] : [],
    checks: {
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecial,
      hasMinLength
    }
  };
};

const PasswordStrengthIndicator = ({ password = '' }) => {  // Add default empty string
  const validation = validatePassword(password);
  const strength = Object.values(validation.checks).filter(Boolean).length;

  return (
    <div className="space-y-2 mt-1">
      <div className="flex flex-col gap-1">
        <RequirementItem 
          met={validation.checks.hasMinLength} 
          text="be at least 8 characters long" 
        />
        <RequirementItem 
          met={validation.checks.hasUpperCase} 
          text="include an uppercase letter" 
        />
        <RequirementItem 
          met={validation.checks.hasLowerCase} 
          text="include a lowercase letter" 
        />
        <RequirementItem 
          met={validation.checks.hasNumber} 
          text="include a number" 
        />
        <RequirementItem 
          met={validation.checks.hasSpecial} 
          text="include a special character (!?#)" 
        />
      </div>
      
      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
        <div
          className={`h-full ${getStrengthColor(strength)} rounded-full transition-all duration-300`}
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

const RequirementItem = ({ met, text }) => (
  <div className="flex items-center gap-2">
    {met ? (
      <Check size={16} className="text-green-500" />
    ) : (
      <X size={16} className="text-red-500" />
    )}
    <span className={met ? "text-green-500" : "text-red-500 text-sm"}>
      {text}
    </span>
  </div>
);

const getStrengthColor = (strength) => {
  const colors = {
    0: 'bg-red-500',
    1: 'bg-orange-500',
    2: 'bg-yellow-500',
    3: 'bg-blue-500',
    4: 'bg-green-500',
    5: 'bg-green-500'
  };
  return colors[strength] || 'bg-red-500';
};

export { validatePassword, PasswordStrengthIndicator };