// client/src/components/Footer.jsx
import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full mt-16">
      {/* Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-10">

          {/* Logo + Description */}
          <div>
            <h3 className="text-3xl font-bold text-green-400 mb-4">EcoTrack</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A community platform driving measurable, collective progress toward a greener and more sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-green-400 transition">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-green-400 transition">Contact</Link></li>
              <li><Link to="/challenges" className="text-gray-300 hover:text-green-400 transition">Challenges</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-green-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-4">Get In Touch</h4>
            <ul className="text-sm space-y-2 text-gray-300">
              <li>Email: support@ecotrack.com</li>
              <li>Phone: +880 123 456789</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-green-400 mb-4">Follow Us</h4>

            <div className="flex space-x-4">
              {/* X */}
              <a
                href="#"
                className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition"
              >
                <FaInstagram className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 text-center md:flex md:items-center md:justify-between text-gray-400 text-sm">
          <p>© 2025 EcoTrack. All rights reserved.</p>

          <div className="flex justify-center space-x-4 mt-3 md:mt-0">
            <Link to="/accessibility" className="hover:text-green-400 transition">
              Accessibility Note
            </Link>
            <Link to="/privacy" className="hover:text-green-400 transition">
              Privacy Note
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
