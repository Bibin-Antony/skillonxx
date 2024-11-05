import React from 'react';

const IconBadge = ({ 
  icon, 
  className = "", 
  bgClassName = "bg-blue-100", 
  size = "medium" 
}) => {
  const sizeClasses = {
    small: "p-1.5",
    medium: "p-2",
    large: "p-3"
  };

  return (
    <div className={`${bgClassName} rounded-lg ${sizeClasses[size]} ${className}`}>
      {React.cloneElement(icon, {
        className: `${icon.props.className || ''}`
      })}
    </div>
  );
};

export default IconBadge;