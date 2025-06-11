import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Popup from "../Popup/NewsFeedPopup";
import GalleryPopup from "../Popup/GalleryPopup";

const Layout = () => {




  return (
    <>
      <NavBar />
      <main>
        <Outlet  />
      </main>
      <Footer />
      
    </>
  );
};

export default Layout;