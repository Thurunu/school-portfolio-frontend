import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ linkText, linkUrl, onClick, className = "" }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <Link
      to={linkUrl}
      onClick={onClick}
      className={`text-white hover:text-secondary transition-colors duration-200 ${
        isActive(linkUrl) ? "text-secondary font-semibold" : ""
      } ${className}`}
    >
      {linkText}
    </Link>
  );
};

export default MenuItem;