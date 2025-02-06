// src/components/RewardsSection.jsx
import React from 'react';
import { Trophy, Gift, Award, Star } from 'lucide-react';

const RewardsSection = () => {
  const rewards = {
    mainPrizes: [
      {
        position: "Winner",
        amount: "₹50,000",
        extras: ["Winner Certificate", "Mentorship Opportunity"]
      },
      {
        position: "First Runner Up",
        amount: "₹30,000",
        extras: ["Runner-up Certificate", "Internship Opportunity"]
      },
      {
        position: "Second Runner Up",
        amount: "₹20,000",
        extras: ["Certificate", "Development Tools License"]
      }
    ],
    additionalBenefits: [
      "Participation certificates for all",
      "Internship opportunities",
      "Goodies and swag",
      "Networking opportunities"
    ]
  };

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Rewards and Prizes
      </h2>

      {/* Main Prizes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {rewards.mainPrizes.map((prize, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Trophy 
                className={`w-8 h-8 ${
                  index === 0 ? 'text-yellow-500' :
                  index === 1 ? 'text-gray-400' :
                  'text-orange-500'
                }`}
              />
            </div>
            
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {prize.position}
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {prize.amount}
              </div>
              <div className="space-y-2">
                {prize.extras.map((extra, i) => (
                  <div key={i} className="flex items-center justify-center text-gray-600">
                    <Gift className="w-4 h-4 mr-2" />
                    <span>{extra}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Benefits */}
      <div className="bg-blue-50 rounded-xl p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Additional Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.additionalBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg">
              <Star className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RewardsSection;