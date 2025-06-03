import React from "react";
import Image1 from "../../assets/home_image_1.jpg";
import Image2 from "../../assets/home_image_2.jpg";
import Image3 from "../../assets/home_image_3.jpg";
import Image4 from "../../assets/home_image_4.jpg";
import Slider from "react-slick";

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: "",
    description: ""
  },
  {
    id: 2,
    img: Image2,
    title: " ",
    description: " ",
  },
  {
    id: 3,
    img: Image3,
    title: " ",
    description: " ",
  },  {
    id: 4,
    img: Image4,
    title: " ",
    description: " ",
  },
];

const Home = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="relative w-full h-[650px] overflow-hidden">
      {/* Full-width background image slider */}
      <div className="absolute inset-0 z-0">
        <Slider {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className="w-full h-[650px]">
                <img
                  src={data.img}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            {/* text content section */}
            <div className="flex flex-col justify-center gap-4 text-white drop-shadow-2xl p-3 ">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold drop-shadow-sm">
                lorem ipsum dolor sit.
              </h1>
              <p className="text-lg opacity-90">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias,
                dolor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;