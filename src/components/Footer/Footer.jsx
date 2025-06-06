import React from "react";
import { TEXTS } from "../Constants/text";
import footerLogo from "../../assets/common/school_logo_transparent.png";
import Banner from "../../assets/common/footer_pattern.png";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const FooterLinks = [
  { id: 1, title: "Home", link: "/#" },
  { id: 2, title: "Gallery", link: "/gallery" },
  { id: 3, title: "News Feed", link: "/news-feed" },
  { id: 4, title: "About", link: "/about" },
];

const Footer = () => {
  return (
    <footer style={BannerImg} className="text-white py-10 mt-10">
      <div className="container mx-auto px-4">
        {/* Four Column Grid Section */}
        <div className="grid md:grid-cols-4 gap-8" data-aos="zoom-in">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={footerLogo} alt="School Logo" className="w-12 h-12" />
              <h1 className="text-xl font-bold">{TEXTS.SCHOOL_NAME}</h1>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {TEXTS.FOOTER_DESCRIPTION}
            </p>
            <div className="flex items-center gap-2 mb-2 text-sm">
              <FaLocationArrow />
              <span>{TEXTS.FOOTER_ADDRESS}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <FaMobileAlt />
              <span>{TEXTS.FOOTER_PHONE}</span>
            </div>
            <p className="mt-5">{TEXTS.FOOTER_COPYRIGHT}</p>
          </div>
          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul className="flex flex-col gap-2">
              {FooterLinks.map((link) => (
                <li
                  key={link.id}
                  className="text-gray-200 hover:text-secondary cursor-pointer transition-all duration-300 hover:translate-x-1"
                >
                  {link.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex items-center gap-3 text-gray-200 hover:text-secondary transition"
              >
                <FaFacebook className="text-xl" />
                <span>Facebook</span>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center gap-3 text-gray-200 hover:text-secondary transition"
              >
                <FaInstagram className="text-xl" />
                <span>Instagram</span>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex items-center gap-3 text-gray-200 hover:text-secondary transition"
              >
                <FaYoutube className="text-xl" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Send Message */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Send Message</h2>
            <form className="grid gap-3">
              <input
                type="text"
                placeholder="Name"
                className="p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm"
              />
              <textarea
                placeholder="Message"
                className="p-2 rounded bg-gray-800 text-white border border-gray-600 text-sm"
                rows="2"
              ></textarea>
              <button
                type="submit"
                className="bg-secondary hover:bg-secondary/80 text-white px-3 py-2 rounded text-sm"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
