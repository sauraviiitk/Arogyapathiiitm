import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-10 pb-6 mt-0">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Aarogyapath</h2>
          <p className="text-sm text-blue-100">
            Your digital companion for spiritual, mental & medical healing. Empowering holistic well-being.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><a href="#about" className="hover:underline">About Us</a></li>
            <li><a href="#discussion" className="hover:underline">Discussion</a></li>
            
            <li><a href="#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="/help" className="hover:underline">Help & Support</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-white text-xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-300"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-300"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-blue-300"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700 mt-10 pt-4 text-center text-sm text-blue-100">
        © {new Date().getFullYear()} Aarogyapath. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

