import React from "react";
import { FaHeartbeat, FaAward, FaHandHoldingHeart } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-32">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <span
              className="text-8xl drop-shadow-2xl"
              style={{ filter: "brightness(0) invert(1)" }}
            >
              🩸
            </span>
          </div>

          <h1 className="text-6xl font-bold mb-6">Every Drop Saves a Life</h1>
          <p className="text-2xl opacity-90 max-w-2xl mx-auto">
            Connecting generous donors with hospitals in need across Egypt
          </p>
        </div>
      </section>


      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                At <span className="font-semibold text-red-600">LifeDrop</span>,
                we are committed to revolutionizing blood donation in Egypt by
                bridging the gap between voluntary donors and hospitals in
                urgent need.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform enables real-time communication, smart matching
                based on blood type and location, and secure management of the
                entire donation process.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-10 rounded-3xl shadow-sm">
              <div className="flex items-center gap-5 text-red-500 mb-8">
                <FaHandHoldingHeart className="text-6xl" />
                <h3 className="text-3xl font-bold">Why LifeDrop?</h3>
              </div>
              <ul className="space-y-6 text-gray-700">
                <li className="flex gap-4 items-start">
                  <span className="text-2xl mt-1">⚡</span>
                  <span>
                    Instant notifications to nearby donors in emergency cases
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <FaHeartbeat className="text-3xl text-red-400 mt-1" />
                  <span>Reducing response time and saving precious lives</span>
                </li>
                <li className="flex gap-4 items-start">
                  <FaAward className="text-3xl text-red-400 mt-1" />
                  <span>
                    Secure, transparent, and professionally managed donation
                    system
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
              <div className="text-6xl font-bold mb-2">12K+</div>
              <div className="text-xl">Active Donors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
              <div className="text-6xl font-bold mb-2">340</div>
              <div className="text-xl">Hospitals Served</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8">
              <div className="text-6xl font-bold mb-2">98K</div>
              <div className="text-xl">Lives Saved</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Be the Reason Someone Lives Today
          </h2>
          <p className="text-xl text-gray-600">
            Join the movement and help us build a stronger, faster blood
            donation network in Egypt.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
