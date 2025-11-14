// client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router';
// Icons for social media (assuming you use react-icons or similar)
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // New X logo

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold text-green-400 mb-4">EcoTrack</h3>
            <p className="text-sm text-gray-400">
              A community platform driving measurable, collective progress towards a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-green-400 transition">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-green-400 transition">Contact</Link></li>
              <li><Link to="/challenges" className="text-gray-300 hover:text-green-400 transition">Challenges</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-green-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info (Example) */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: support@ecotrack.com</li>
              <li>Phone: +880 123 456789</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition">
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-gray-700 hover:bg-green-500 transition">
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Accessibility, Privacy */}
        <div className="pt-6 text-center md:flex md:justify-between md:items-center text-sm text-gray-400">
          <p>© 2025 EcoTrack. All rights reserved.</p>
          <div className="mt-2 md:mt-0 space-x-4">
            <Link to="/accessibility" className="hover:text-green-400">Accessibility Note</Link>
            <Link to="/privacy" className="hover:text-green-400">Privacy Note</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;