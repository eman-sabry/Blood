import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
export function FooterWithLogo() {
  return (
    <footer className="w-full  px-8 py-12 border-t">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <Link to="/" className="flex items-center  group">
            <div className="w-12 h-12 flex-shrink-0">
              <img
                src="/logo2.png"
                alt="LifeDrop Icon"
                className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col items-center -space-y-3">
              <span
                className="text-3xl md:text-4xl text-gray-900 select-none mb-1"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 700 }}
              >
                Life<span className="text-red-600">Drop</span>
              </span>

              <span
                className="text-lg md:text-xl text-red-600 select-none"
                style={{
                  fontFamily: "'Changa', sans-serif",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  filter: "drop-shadow(0px 1px 1px rgba(0,0,0,0.05))",
                }}
              >
                قطرة حياة
              </span>
            </div>
          </Link>

          <p className="text-gray-500 mt-3 max-w-xs">
            Saving lives by connecting blood donors with hospitals in real time.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-700">Quick Links</h3>

          <Link className="text-gray-500 hover:text-red-500" to="/about">
            About Us
          </Link>

          <Link className="text-gray-500 hover:text-red-500" to="/contact">
            Contact Us
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-gray-700">Join Us</h3>
          <Link to="/signup">
            <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-600 transition">
              Register Now
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-10 border-t pt-6 text-center text-gray-500 text-sm">
        © 2026 LifeDrop. All rights reserved.
      </div>
    </footer>
  );
}
