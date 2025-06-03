import React from "react";
import logo from "../../../public/school_logo.png";


const Menu = [
  { id: 1, name: "Home", link: "#home" },
  { id: 2, name: "Gallery", link: "#gallery" },
  { id: 3, name: "News Feed", link: "#news-feed" },
  { id: 4, name: "About", link: "#about" },
];

const NavBar = () => {
  return (
    <div className="bg-primary py-4 shadow-md">
      <div className="container mx-auto px-10 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
          <img src={logo} alt="Logo" className="w-10" />
        </a>
      

        {/* Links */}
        <ul className="sm:flex hidden items-center gap-8">
          {Menu.map((data) => (
            <li key={data.id}>
              <a
                href={data.link}
                className="inline-block px-3 text-white hover:text-secondary duration-200"
              >
                {data.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
