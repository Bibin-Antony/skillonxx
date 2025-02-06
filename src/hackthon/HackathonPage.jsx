// src/pages/HackathonPage.jsx
import React, { useState, Suspense, useEffect } from 'react';
import { Users, Trophy, MapPin, Mail, Calendar, Info, UserCheck } from 'lucide-react';
import ErrorBoundary from './ErrorBoundary';

// Import components
import TimelineComponent from './TimelineComponent';
import AboutSection from './AboutSection';
import EligibilitySection from './EligibilitySection';
import RewardsSection from './RewardsSection';
import FAQSection from './FAQSection';
import LoadingSpinner from './LoadingSpinner';

// Import data
import { timelineData } from './data/timelineData';
import { aboutData } from './data/aboutData';
import { eligibilityData } from './data/eligibilityData';

const HackathonPage = () => {
  const [activeTab, setActiveTab] = useState('timeline');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabConfig = [
    { 
      id: 'timeline', 
      label: 'Timeline', 
      component: TimelineComponent, 
      data: timelineData,
      icon: <Calendar className="w-4 h-4" />
    },
    { 
      id: 'about', 
      label: 'About', 
      component: AboutSection, 
      data: aboutData,
      icon: <Info className="w-4 h-4" />
    },
    { 
      id: 'eligibility', 
      label: 'Eligibility', 
      component: EligibilitySection, 
      data: eligibilityData,
      icon: <UserCheck className="w-4 h-4" />
    }
  ];

  const renderContent = () => {
    const currentTab = tabConfig.find(tab => tab.id === activeTab);
    if (!currentTab) return null;

    const Component = currentTab.component;
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Component data={currentTab.data} />
        </Suspense>
      </ErrorBoundary>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white pt-32  pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-12">Innovonx 2025</h1>
            
            <div className="flex flex-wrap justify-center gap-6">
              <StatusBadge icon={<Users />} text="146 Registered" />
              <StatusBadge icon={<Trophy />} text="₹1,00,000 Prize Pool" />
              <StatusBadge icon={<MapPin />} text="(V.V.I.E.T), Mysore" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Tabbed Section */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Navigation */}
          <nav className="flex justify-center mb-12 overflow-x-auto sticky top-20 z-40 py-2">
            <div className="bg-white rounded-lg p-1 shadow-sm flex">
              {tabConfig.map((tab) => (
                <NavButton 
                  key={tab.id}
                  active={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  text={tab.label}
                  icon={tab.icon}
                />
              ))}
            </div>
          </nav>

          {/* Content Area */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 min-h-[400px] shadow-sm">
            {renderContent()}
          </div>
        </div>

        {/* Rewards Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <RewardsSection />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <FAQSection />
          </div>
        </section>

        {/* Register CTA */}
        <div className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Join OpenHack 2025?</h2>
            <button 
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium 
                       hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl 
                       transform hover:-translate-y-0.5 active:translate-y-0
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <footer className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Contact the Organizers</h3>
            <div className="flex flex-wrap justify-center gap-8">
              <ContactLink email="namanmalpani@iisc.ac.in" name="Naman Malpani" />
              <ContactLink email="himanshud@iisc.ac.in" name="Himanshu Devrani" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

// Utility Components
const StatusBadge = ({ icon, text }) => (
  <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full 
                  hover:bg-white/20 transition-colors cursor-default">
    {icon}
    <span>{text}</span>
  </div>
);

const NavButton = ({ active, onClick, text, icon }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap
                flex items-center gap-2
      ${active
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-100'
      }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

const ContactLink = ({ email, name }) => (
  <a 
    href={`mailto:${email}`}
    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 
              transition-colors group"
  >
    <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
    <span>{name}</span>
  </a>
);

export default HackathonPage;