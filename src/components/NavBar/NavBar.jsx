import React, { useState } from "react";
import { TEXTS } from "../Constants/text"; // Importing text constants
import logo from "../../assets/common/school_logo.png";
import { Menu, X } from "lucide-react"; // Hamburger and Close icons

const menuItems = [
  { id: 1, name: "Home", link: "#home" },
  { id: 2, name: "Gallery", link: "#gallery" },
  { id: 3, name: "Events", link: "#events" },
  { id: 4, name: "News Feed", link: "#news-feed" },
  { id: 5, name: "About", link: "#about" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-primary py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="font-bold text-2xl sm:text-3xl flex gap-2 items-center text-white"
        >
          <img src={logo} alt="Logo" className="w-10" />
          {TEXTS.SCHOOL_NAME}
        </a>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex items-center gap-8">
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={item.link}
                className="text-white hover:text-secondary transition-colors duration-200"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Icon */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {menuOpen && (
        <div className="sm:hidden bg-primary px-6 pt-4 pb-6">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.link}
                  className="block text-white hover:text-secondary transition-colors duration-200"
                  onClick={() => setMenuOpen(false)} // Close on click
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
