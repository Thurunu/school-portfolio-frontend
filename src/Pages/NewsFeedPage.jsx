import React from "react";
import axios from "axios";
import testImg from "../assets/common/no_image.png";
import { TEXTS } from "../components/Constants/text";

const NewsFeed = ({ handleNewsPopup }) => {
  const [newsData, setNewsData] = React.useState([]);

  const [showAll, setShowAll] = React.useState(false);

  // Fetch data from api
  React.useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/news-feed");
        // console.log(response.data[0].bannerImg);
        setNewsData(response.data);
      } catch (error) {
        console.error("Error occured while fetching news data: ", error);
      }
    };
    fetchNews();
  }, []);

  // Show only first 2 news items by default
  const displayedNews = showAll ? newsData : newsData.slice(0, 2);

  return (
    <section id="news-feed">
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
            {/* News Items */}
            {displayedNews.map((data) => (
              <div
                key={data._id}
                className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-center"
              >
                {/* Image section */}
                <div data-aos="zoom-in" className="flex justify-center">
                  <img
                    // src={data.bannerImg}
                    src={data.img || testImg}
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
                    className="text-base text-gray-700 tracking-wide leading-6 font-light italic"
                  >
                    <span className="font-medium">Date:</span> {data.date}
                  </p>

                  {/* <p
                  data-aos="fade-up"
                  className="text-sm text-gray-600 tracking-wide leading-6"
                >
                    {data.desc.split(" ").slice(0, 60).join(" ") + (data.desc.split(" ").length > 10 ? "..." : "")}

                </p> */}
                  {/* Button to open popup */}
                  <button
                    data-aos="fade-up"
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary hover:text-black transition-colors duration-300 cursor-pointer w-fit"
                    type="button"
                    onClick={() => handleNewsPopup(data._id)}
                  >
                    Read more...
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* See More Button */}
          {!showAll && newsData.length > 2 && (
            <div className="text-center mt-12">
              <button
                data-aos="fade-up"
                className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary hover:text-black transition-colors duration-300 cursor-pointer"
                type="button"
                onClick={() => setShowAll(true)}
              >
                {TEXTS.SEEMORE_BTN}
              </button>
            </div>
          )}

          {/* Show Less Button */}
          {showAll && newsData.length > 2 && (
            <div className="text-center mt-12">
              <button
                data-aos="fade-up"
                className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary hover:text-black transition-colors duration-300 cursor-pointer"
                type="button"
                onClick={() => setShowAll(false)}
              >
                Show Less
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsFeed;
