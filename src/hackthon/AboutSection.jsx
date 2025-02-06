import React from "react";

const BenefitsList = ({ title, items }) => {
  if (!items || items.length === 0) return null; // Prevent rendering if no items exist

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const AboutSection = ({ data }) => {
  if (!data) return null; // Prevent rendering if no data is provided

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.title}</h2>
        <p className="text-gray-600 mb-6">{data.description}</p>

        {data.introduction &&
          data.introduction.map((para, index) => (
            <p key={index} className="text-gray-600 mb-4">{para}</p>
          ))}

        <div className="space-y-6">
          <BenefitsList title="Benefits" items={data.benefits} />
          <BenefitsList title="Opportunities" items={data.opportunities} />
          <BenefitsList title="Evaluation Criteria" items={data.evaluationCriteria} />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
