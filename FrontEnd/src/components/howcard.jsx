import React from "react";
import { Link } from "react-router-dom";

const HowCard = ({
  icon,
  title,
  description,
  iconColor,
  iconBg,
  buttonText,
  path,
  step,
  border = "border-gray-200",
}) => {
  return (
    <div
      className={`max-w-xs w-full  flex flex-col justify-center items-center gap-4 bg-white border ${border} rounded-2xl px-2 py-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
    >
      <div
        className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} text-xl font-bold`}
      >
        {icon}
      </div>
      <span className="text-sm font-semibold tracking-widest text-black/30 uppercase">
        {step}
      </span>

      <div className="flex flex-col gap-1 w-3/4">
        <p className="text-gray-900 text-2xl font-semibold text-center">
          {title}
        </p>

        <p className="text-gray-500 text-md text-center">{description}</p>
      </div>
      <Link to={path}>
        <button
          className={`mt-3 ${iconBg} ${iconColor} px-4 py-2 rounded-md hover:scale-105 transition`}
        >
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default HowCard;
