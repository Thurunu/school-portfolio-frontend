import React from 'react'
import logo from '../../../public/school_logo.svg';

const NavBar = () => {
  return (
    <div className='bg-primary py-3 sm:py-0 shadow-md  dark:bg-gray-900 dark:text-white'>
        {/* Logo */}
      <div className='container flex justifiy-between intems-center'>
        <a href='#' className='font-bold text-2xl sm:text-3xl flex gap-2'><img src={logo} alt='Logo' className='w-10 uppercase' /></a>
      </div>
      {/* Links */}
      <div></div>
    </div>
  )
}

export default NavBar
