import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  emailjs
    .send(
      "service_p4aw6in",
      "template_xcsergt",
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      "aJlFBuJQ73WSLeALv",
    )
    .then(
      () => {
        toast.success("Message sent successfully ");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      },
      (error) => {
        toast.error("Failed to send message");
        console.log(error);
      },
    );
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <FaHeart className="text-6xl text-white/80" />
          </div>
          <h1 className="text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-2xl opacity-90 max-w-2xl mx-auto">
            We’re here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                Contact Us
              </h2>
              <p className="text-gray-600 text-lg mb-10">
                Have questions? Want to partner with us? Or just want to say
                hello? We’d love to hear from you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 text-2xl flex-shrink-0">
                  <FaPhone />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">+20 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 text-2xl flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">info@lifedrop.eg</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 text-2xl flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">Giza, Egypt</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 text-2xl flex-shrink-0">
                  <FaClock />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Working Hours</h3>
                  <p className="text-gray-600">
                    24/7 Support for Emergency Requests
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-lg p-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-red-400 transition"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-red-400 transition"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-red-400 transition"
                  required
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message..."
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-gray-200 rounded-3xl focus:outline-none focus:border-red-400 transition resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-lg py-2 rounded-2xl transition transform shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
