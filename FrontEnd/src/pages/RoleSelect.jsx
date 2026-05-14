import HowCard from "../components/howcard";
import { FaTint, FaHospital, FaUserShield } from "react-icons/fa";

export default function RoleSelect() {
  const data = [
    {
      icon: <FaTint />,
      title: "I'm a Donor",
      description:
        "Save lives by donating blood. Get alerts, earn rewards, and be part of a community making real impact.",
      buttonText: "Donate Now",
      path: "/register-donor",
      iconColor: "text-red-500",
      iconBg: "bg-red-50",
    },
    {
      icon: <FaHospital />,
      title: "I'm a Hospital",
      description:
        "Request blood instantly from verified donors. Manage inventory, track requests, and optimize blood management.",
      buttonText: "Apply Now",
      path: "/register-hospital",
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    }
  /*  {
      icon: <FaUserShield />,
      title: "I'm an Admin",
      description:
        "Manage the platform, verify partners, monitor system health, and make data-driven decisions.",
      buttonText: "Request Admin Access",
      path: "/request-admin",
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    },*/
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-white to-red-50 gap-4 px-8 md:px-12 py-12">
      <h1 className="text-4xl md:text-6xl font-black text-center text-gray-900 tracking-tight">
        Join <span className="text-red-500">LifeDrop</span> Today
      </h1>

      <p className="text-gray-500 text-base sm:text-lg md:text-xl mt-4 text-center max-w-2xl px-2">
        Choose your role and start making a difference in your community.
        Whether you're a donor, hospital, or admin, there's a place for you at
        LifeDrop.
      </p>
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mt-8">
        I want to join as a...
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10-8">
        {data.map((card, index) => (
          <HowCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
