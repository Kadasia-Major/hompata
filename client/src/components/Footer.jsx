import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email && email.includes('@')) {
      setMessage({ type: 'success', text: 'Form submitted successfully!' });
      setEmail('');
    } else {
      setMessage({ type: 'error', text: 'Please enter a valid email' });
    }
  };

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
    ],
    properties: [
      { name: "Browse Properties", href: "/" },
      { name: "List Your Property", href: "/list-property" },
      { name: "Property Alerts", href: "/alerts" },
      { name: "Featured Listings", href: "/featured" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Safety Tips", href: "/safety" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com", color: "hover:bg-blue-600" },
    { icon: FaTwitter, href: "https://twitter.com", color: "hover:bg-sky-500" },
    { icon: FaInstagram, href: "https://instagram.com", color: "hover:bg-pink-500" },
    { icon: FaLinkedinIn, href: "https://linkedin.com", color: "hover:bg-blue-700" },
  ];

  return (
    <footer className="bg-gray-900 text-white relative">

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Hompata
            </h2>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted property platform in Kenya. Find, list, and connect
              with verified landlords easily and safely.
            </p>

            <div className="space-y-3 text-gray-300 text-sm">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-400" />
                support@hompata.com
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-400" />
                +254 712 345 678
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-400" />
                Nairobi, Kenya
              </div>

            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              {footerLinks.company.map((item, i) => (
                <li key={i}>
                  <Link className="hover:text-green-400 transition" to={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PROPERTIES */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Properties</h3>
            <ul className="space-y-2 text-gray-300">
              {footerLinks.properties.map((item, i) => (
                <li key={i}>
                  <Link className="hover:text-green-400 transition" to={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              {footerLinks.support.map((item, i) => (
                <li key={i}>
                  <Link className="hover:text-green-400 transition" to={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* SOCIAL + SUBSCRIBE */}
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col lg:flex-row justify-between gap-8">

          {/* SOCIAL */}
          <div>
            <h3 className="text-green-400 font-semibold mb-4">
              Connect With Us
            </h3>

            <div className="flex gap-3">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;

                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-white transition transform hover:scale-110 ${social.color}`}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* SUBSCRIBE */}
          <div className="w-full max-w-md">
            <h3 className="text-green-400 font-semibold mb-4">
              Stay Updated
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <label htmlFor="footer-email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>

              <div className="flex border border-gray-600 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-green-500 transition">
                <input 
                  type="email" 
                  id="footer-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="flex-1 px-4 py-2 outline-none bg-gray-800/50 text-white placeholder-gray-400"
                />
                <button 
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white py-3 transition-colors whitespace-nowrap font-medium w-32"
                >
                  Submit
                </button>
              </div>

              {message && (
                <p className={`text-xs ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {message.text}
                </p>
              )}
            </form>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">

          <p>
            © {currentYear} Hompata. All rights reserved. (powered by KadasiaTech)
          </p>

          <div className="flex gap-5 mt-3 md:mt-0">
            <Link className="hover:text-green-400" to="/terms">Terms</Link>
            <Link className="hover:text-green-400" to="/privacy">Privacy</Link>
            <Link className="hover:text-green-400" to="/cookies">Cookies</Link>
          </div>

        </div>

      </div>

      {/* FLOATING WHATSAPP (single + clean) */}
      <a
        href="https://wa.me/254700000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-transform hover:scale-110"
      >
        <FaWhatsapp size={26} />
      </a>

    </footer>
  );
};

export default Footer;