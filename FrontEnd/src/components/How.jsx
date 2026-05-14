import React from "react";
import { FaTint, FaHospital, FaUserShield } from "react-icons/fa";

const data = [
  {
    icon: <FaTint />,
    title: "Be the Life-Line",
    step: "01. JOIN",
    description:
      "Register your blood type and stay ready for nearby emergency alerts.",
    highlight: "Ready to save lives",
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
  },
  {
    icon: <FaHospital />,
    title: "Answer the Call",
    step: "02. CONNECT",
    description:
      "Hospitals send urgent requests. If you're a match, you're the hero they need.",
    highlight: "Real-time impact",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    icon: <FaUserShield />,
    title: "Donate with Trust",
    step: "03. SECURE",
    description:
      "Every request is verified by admins to ensure a safe, organized process.",
    highlight: "100% Verified & Safe",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
];

const How = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-50 px-6 py-20">
   
      <h1 className="text-4xl md:text-6xl font-black text-center text-gray-900 tracking-tight">
        Simple Steps, <span className="text-red-600">Big Impact.</span>
      </h1>

      <p className="text-gray-500 text-lg md:text-xl mt-4 text-center max-w-xl">
        A seamless way to connect donors with those in urgent need.
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-6xl">
        {data.map((item) => (
          <div
            key={item.step}
            className="group flex flex-col items-center text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300"
          >
           
            <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full mb-6">
              {item.step}
            </span>

           
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-6 text-3xl ${item.iconBg} ${item.iconColor} group-hover:scale-110 transition-transform`}
            >
              {item.icon}
            </div>

        
            <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>

            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              {item.description}
            </p>
            <div className="mt-6 py-2 px-4 bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg border border-gray-100 group-hover:bg-gray-100 transition-colors">
              {item.highlight}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default How;
