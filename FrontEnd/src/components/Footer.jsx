import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
export function FooterWithLogo() {
  return (
    <footer className="w-full  px-8 py-12 border-t">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <Typography
            as={Link}
            to="/"
            className="text-2xl font-bold flex items-center gap-2"
          >
            <span className="text-red-500 text-3xl">🩸</span>
            LifeDrop
          </Typography>

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

          <Link className="text-gray-500 hover:text-red-500" to="/faq">
            FAQ
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
