import React from 'react';
import Links from './Links';
import LibraryButton from './LibraryButton';

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="sm:hidden bg-primary px-6 pt-4 pb-6">
      <Links isMobile={true} onItemClick={onClose} />
      <LibraryButton isMobile={true} />
    </div>
  );
};

export default MobileMenu;