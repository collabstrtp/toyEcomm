import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "../assets/logo.png";

const Footer = ({ isFixed = false }) => {
  const footerClasses = isFixed
    ? "fixed bottom-0 w-full bg-orange-600 text-white p-10 z-50 shadow-2xl -mt-10"
    : "relative w-full bg-orange-600 text-white mt-10"; // Default relative positioning
  return (
    <footer className={footerClasses}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-white text-lg font-bold mb-4">
              <img src={logo} alt="ShopHub Logo" className="w-[150px]" />
            </div>
            <p className="text-sm mb-4 text-orange-100">
              Your one-stop destination for quality products at unbeatable
              prices. Shop with confidence and convenience.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-orange-100 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-orange-100 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-orange-100 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-orange-100 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-orange-100">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm text-orange-100">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-orange-100">
              <li className="flex items-start">
                <MapPin size={16} className="mr-2 mt-1 flex shrink-0" />
                <span>123 Shopping Street, Commerce City, CC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 flex shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 flex shrink-0" />
                <span>support@shophub.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs mb-2 text-orange-100">
                Subscribe to our newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-white text-gray-900 border border-orange-400 rounded-l focus:outline-none focus:border-orange-300"
                />
                <button className="px-4 py-2 bg-orange-800 text-white text-sm rounded-r hover:bg-orange-900 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-orange-100">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
