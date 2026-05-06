import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaHeart, FaClock, FaTint } from 'react-icons/fa';

const Information = () => {
  return (
    <div className="min-h-screen ">
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <FaTint className="text-6xl mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Information</h1>
          <p className="text-xl opacity-90">
            Everything you need to know before donating blood
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pt-12">
        {/* Eligibility Criteria */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <FaCheckCircle className="text-green-500" /> Eligibility Criteria
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h3 className="text-2xl font-semibold text-green-600 mb-6">
                {" "}
                You CAN Donate If:
              </h3>
              <ul className="space-y-4 text-gray-700  font-semibold ">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span> Age between 18
                  and 65 years
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span> Weight more
                  than 50 kg
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span> In good general
                  health
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span> Hemoglobin
                  level is normal
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">•</span> No recent
                  illness or medication
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h3 className="text-2xl font-semibold text-red-600 mb-6">
                You CANNOT Donate If:
              </h3>
              <ul className="space-y-4 text-gray-700 font-semibold ">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span> Have chronic
                  diseases (Diabetes, Hypertension, etc.)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span> Had hepatitis or
                  malaria
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span> Recent tattoo or
                  piercing (less than 6 months)
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span> Pregnant or
                  breastfeeding
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span> Had major surgery
                  in last 6 months
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Donation Rules */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Donation Rules & Guidelines
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-3xl shadow-sm border border-red-100">
              <div className="text-red-500 text-4xl mb-4">⏱️</div>
              <h3 className="font-bold text-xl mb-3">Frequency</h3>
              <p className="text-gray-600">
                Every 3 months 
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm border border-red-100">
              <div className="text-red-500 text-4xl mb-4">🥗</div>
              <h3 className="font-bold text-xl mb-3">Before Donation</h3>
              <p className="text-gray-600">
                Eat a healthy meal
                <br />
                Drink plenty of water
                <br />
                Avoid fatty foods
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl shadow-sm border border-red-100">
              <div className="text-red-500 text-4xl mb-4">🛌</div>
              <h3 className="font-bold text-xl mb-3">After Donation</h3>
              <p className="text-gray-600">
                Rest for 10-15 minutes
                <br />
                Drink fluids
                <br />
                Avoid heavy exercise for 24 hours
              </p>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-gradient-to-br from-red-50 to-pink-50 p-10 rounded-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FaHeart className="text-red-500" /> Important Notes
          </h2>
          <ul className="space-y-4 text-gray-700 text-lg  font-semibold">
            <li>• All donations are voluntary and free of charge.</li>
            <li>• Your blood type will be tested and recorded.</li>
            <li>• Strict confidentiality is maintained.</li>
            <li>• You will receive a donor card after your first donation.</li>
            <li>• Emergency donors get priority support.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Information;