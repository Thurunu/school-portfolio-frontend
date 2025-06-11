import React from 'react';
import MenuItem from './MenuItem';

const menuItems = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Gallery", link: "/gallery" },
  { id: 3, name: "Events", link: "/events" },
  { id: 4, name: "News Feed", link: "/news-feed" },
  { id: 5, name: "About", link: "/about" },
];

const Links = ({ isMobile = false, onItemClick }) => {
  return (
    <nav className={isMobile ? "flex flex-col gap-4" : "hidden sm:flex items-center gap-8"}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          linkText={item.name}
          linkUrl={item.link}
          onClick={onItemClick}
          className={isMobile ? "block" : ""}
        />
      ))}
    </nav>
  );
};

export default Links;