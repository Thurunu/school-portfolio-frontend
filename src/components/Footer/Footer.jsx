import React from "react";
import footerLogo from "../../../public/school_logo_transparent.png";
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
  height: "100%",
  width: "100%",
};

const FooterLinks = [
  {
    id: 1,
    title: "Home",
    link: "/#",
  },
  {
    id: 2,
    title: "Gallery",
    link: "/gallery",
  },
  {
    id: 3,
    title: "News Feed",
    link: "/news-feed",
  },
  {
    id: 4,
    title: "About",
    link: "/about",
  },
];

const Footer = () => {
  return (
    <div style={BannerImg} className="text-white mb-5">
      <div className="container">
        <div data-aos="zoom-in" className="grid md:grid-cols-3 pb-15 pt-5">
          {/* school details  */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="" className="max-w-[50px]" />
              School name
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
              aspernatur veniam architecto atque facere, eligendi similique
              corporis odit, ipsa magnam error? Hic quae, voluptatibus sit
              praesentium iure quis repudiandae repellendus?
            </p>
          </div>
          {/* footer links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md_pl-10">
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">
                  Important Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li
                      key={link.id}
                      className="cursor-pointer hover:text-secondary hover:translate-x-1 duration-300 text-gray-200"
                    >
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="py-8 px-4">
                <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {FooterLinks.map((link) => (
                    <li 
                    key={link.id}
                    className="cursor-pointer hover:text-secondary hover:translate-x-1 duration-300 text-gray-200">
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* social links */}
            <div>
              <div className="flex intems-center gap-3 mt-6">
                <a href="#">
                  <FaFacebook className="text-3xl" />
                </a>
                <a href="#">
                  <FaInstagram className="text-3xl" />
                </a>
                <a href="#">
                  <FaYoutube className="text-3xl" />
                </a>
              </div>
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <FaLocationArrow /> <p> 123/E, Sri Lanka</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaMobileAlt /> <p> +94 12345678</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
