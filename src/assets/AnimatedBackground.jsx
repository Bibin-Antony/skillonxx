// AnimatedBackground.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const THEMES = {
  home: {
    bgColor: 'bg-gradient-to-br from-blue-50 to-purple-50',
    iconColor: 'text-blue-500',
    icons: ['⚡', '💻', '🚀', '🎓', '💡', '⚛️', '🔷', '📱']
  },
  courses: {
    bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
    iconColor: 'text-emerald-500',
    icons: ['📚', '🎯', '💭', '🔍', '📝', '🎨', '📊', '🏆']
  }
};

const FloatingIcon = ({ icon, delay, prefersReducedMotion }) => {
  const randomX = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 10;
  
  return (
    <div
      className={`absolute text-2xl opacity-20 transform
        ${prefersReducedMotion ? '' : 'animate-float'}
        transition-all duration-1000`}
      style={{
        left: `${randomX}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${randomDuration}s`
      }}
    >
      {icon}
    </div>
  );
};

const AnimatedBackground = ({ children }) => {
  const location = useLocation();
  const [theme, setTheme] = useState(THEMES.home);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prefersReducedMotion = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });

  useEffect(() => {
    setIsTransitioning(true);
    const newTheme = location.pathname === '/courses' ? THEMES.courses : THEMES.home;
    
    const timer = setTimeout(() => {
      setTheme(newTheme);
      setIsTransitioning(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fixed background layer */}
      <div
        className={`fixed inset-0 transition-colors duration-700 ease-in-out ${theme.bgColor} 
          ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* Floating icons */}
        {!prefersReducedMotion && theme.icons.map((icon, index) => (
          <FloatingIcon
            key={index}
            icon={icon}
            delay={index * 2}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
      
      {/* Content layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;