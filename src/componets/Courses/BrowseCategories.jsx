import React from 'react';
import { Code, Database, Palette, ChartBar, Globe, Server, Lock, Cpu } from 'lucide-react';

const categories = [
  { name: 'Web Development', icon: <Globe className="w-10 h-10" />, courses: '50+ Courses' },
  { name: 'Data Science', icon: <ChartBar className="w-10 h-10" />, courses: '30+ Courses' },
  { name: 'UI/UX Design', icon: <Palette className="w-10 h-10" />, courses: '40+ Courses' },
  { name: 'Mobile App Dev', icon: <Cpu className="w-10 h-10" />, courses: '35+ Courses' },
  { name: 'Machine Learning', icon: <Database className="w-10 h-10" />, courses: '45+ Courses' },
  { name: 'Cloud Computing', icon: <Server className="w-10 h-10" />, courses: '25+ Courses' },
  { name: 'Cybersecurity', icon: <Lock className="w-10 h-10" />, courses: '20+ Courses' },
  { name: 'DevOps', icon: <Code className="w-10 h-10" />, courses: '15+ Courses' },
];

const CustomButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

const BrowseCategories = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-white to-tertiary">
      <div className="max-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-font">
          Explore Tech Skills by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-9 mt-10">
          {categories.map((category) => (
            <div key={category.name} className="bg-font p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-3 shadow-font/50">
              <div className="text-white mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-1 text-white">{category.name}</h3>
              <p className="text-sm text-white">{category.courses}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <p className="text-font tracking-wide font-semibold mb-4">Discover our comprehensive range of cutting-edge tech courses.</p>
          <CustomButton className='bg-font hover:bg-cta hover:text-font hover:scale-105' onClick={() => console.log('View All Categories clicked')}>
            View All Categories
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;