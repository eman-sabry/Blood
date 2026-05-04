import React from "react";
import { FaTint, FaHospital, FaUserShield } from "react-icons/fa";

const data = [
  {
    icon: <FaTint />,
    title: "Donor Journey",
    step: "Step 01",
    description:
      "Register as a donor, set your profile, and get notified when someone needs your blood type.",
    highlight: "You receive donation requests nearby",
    iconColor: "text-red-500",
    iconBg: "bg-red-50",
  },
  {
    icon: <FaHospital />,
    title: "Hospital Requests",
    step: "Step 02",
    description:
      "Hospitals send blood requests instantly based on patient needs and blood availability.",
    highlight: "Hospitals search & request donors",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    icon: <FaUserShield />,
    title: "Admin Control",
    step: "Step 03",
    description:
      "Admins approve users, monitor activity, and ensure safe and verified blood donations.",
    highlight: "System moderation & approval",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
];

const How = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-red-50 px-6 py-20">
   
      <h1 className="text-5xl md:text-7xl font-bold text-center text-gray-900">
        How It Works
      </h1>

      <p className="text-gray-500 text-lg md:text-2xl mt-6 text-center max-w-3xl">
        A simple flow that connects donors, hospitals, and admins to save lives
        faster
      </p>

   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20 w-full max-w-7xl">
        {data.map((item) => (
          <div
            key={item.step}
            className="flex flex-col items-center text-center bg-white rounded-3xl shadow-md border border-gray-100 p-10 hover:shadow-xl transition duration-300"
          >
           
            <div
              className={`w-20 h-20 flex items-center justify-center rounded-2xl mb-6 text-4xl ${item.iconBg} ${item.iconColor}`}
            >
              {item.icon}
            </div>

            
            <p className="text-sm font-bold text-gray-400 tracking-widest">
              {item.step}
            </p>

           
            <h2 className="text-2xl font-bold mt-3 text-gray-900">
              {item.title}
            </h2>

           
            <p className="text-gray-500 mt-4 text-base leading-relaxed">
              {item.description}
            </p>

            
            <div className="mt-6 text-sm font-medium text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 w-full">
              {item.highlight}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default How;
