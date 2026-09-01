import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-6 lg:px-14 flex flex-col lg:flex-row lg:justify-between items-center gap-4">

        {/* Logo and description */}
        <div className="text-center lg:text-left">
          <h2 className="text-3xl font-bold mb-2">
            Linklytics
          </h2>

          <p className="text-gray-300">
            Simplifying URL shortening for efficient sharing
          </p>
        </div>

        {/* Copyright */}
        <p className="text-gray-400">
          &copy; 2024 Linklytics. All rights reserved.
        </p>

        {/* Social icons */}
        <div className="flex space-x-6">

          <a
            href="#"
            className="text-white hover:text-gray-300 transition"
          >
            <FaFacebook size={24} />
          </a>

          <a
            href="#"
            className="text-white hover:text-gray-300 transition"
          >
            <FaTwitter size={24} />
          </a>

          <a
            href="#"
            className="text-white hover:text-gray-300 transition"
          >
            <FaInstagram size={24} />
          </a>

          <a
            href="#"
            className="text-white hover:text-gray-300 transition"
          >
            <FaLinkedin size={24} />
          </a>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
