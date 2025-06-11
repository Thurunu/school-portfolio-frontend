import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Header from "./Header";
import Links from "./Links";
import LibraryButton from "./LibraryButton";
import MobileMenu from "./MobileMenu";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="bg-primary py-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Header />

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <Links />
          <LibraryButton />
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
    </div>
  );
};

export default NavBar;