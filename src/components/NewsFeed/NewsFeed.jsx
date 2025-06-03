import React from "react";
import BannerImg1 from "../../assets/banners/banner_img_1.jpg";
import BannerImg2 from "../../assets/banners/banner_img_2.jpg";
import BannerImg3 from "../../assets/banners/banner_img_3.jpg";

const NewsData = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet.",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, optio?",
    bannerImg: BannerImg1,
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet.",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, optio?",
    bannerImg: BannerImg2,
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet.",
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt, optio?",
    bannerImg: BannerImg3,
  },
];

const NewsFeed = () => {
  return (
    <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
      <div className="container px-4 mx-auto">
        {/* Header Section  */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 data-aos="fade-up" className="text-3xl font-bold text-primary">
            Latest News
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Our Best Moments
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          {/* Image section */}
          {NewsData.map((data) => (
            <div
              key={data.id}
              className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center"
            >
              {/* Image section */}
              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={data.bannerImg}
                  alt={data.title}
                  className="w-full max-w-[400px] h-[350px] object-cover drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]"
                />
              </div>

              {/* News in brief section */}
              <div className="flex flex-col justify-center gap-6">
                <h1
                  data-aos="fade-up"
                  className="text-3xl sm:text-4xl font-bold text-black"
                >
                  {data.title}
                </h1>
                <p
                  data-aos="fade-up"
                  className="text-sm text-gray-600 tracking-wide leading-6"
                >
                  {data.desc}
                </p>
                <button
                  data-aos="fade-up"
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:text-black transition-colors duration-300 cursor-pointer w-fit"
                  type="button"
                >
                  Read more...
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
