import React from 'react';
import { Link } from 'react-router-dom';
import { TEXTS } from "../Constants/text";
import logo from "../../assets/common/school_logo.png";

const Header = () => {
  return (
    <header>
      <Link
        to="/"
        className="font-bold text-2xl sm:text-3xl flex gap-2 items-center text-white"
      >
        <img src={logo} alt="Logo" className="w-10" />
        {TEXTS.SCHOOL_NAME}
      </Link>
    </header>
  );
};

export default Header;