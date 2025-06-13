import React, {useEffect, useState} from "react";
import axios from "axios";
import Img1 from "../assets/common/no_image.png";
import Loading from "./LoadingComponent";

const Gallery = ({ handleGalleryPopup }) => {
  const [galleryData, setGalleryData] = useState([]);
  const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(true);
  

  // Fetch image data from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/gallery/first-img"
        );
        setGalleryData(response.data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Determine which images to display
  const displayedImages = showAll ? galleryData : galleryData.slice(0, 5);

  // Dynamic grid class based on number of items
  const getGridClass = (itemCount) => {
    if (itemCount === 1) return "grid grid-cols-1 place-items-center gap-5";
    if (itemCount === 2) return "grid grid-cols-1 sm:grid-cols-2 place-items-center gap-5 max-w-2xl mx-auto";
    if (itemCount === 3) return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-5 max-w-4xl mx-auto";
    if (itemCount === 4) return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-5 max-w-5xl mx-auto";
    return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-5";
  };

  return (
    <section id="gallery">
      <div className="mt-14 mb-12">
        <div className="container">
          {/* Header Section */}
          <div className="text-center mb-10 max-w-[600px] mx-auto">
            <h1 data-aos="fade-up" className="text-3xl font-bold text-primary">
              Gallery
            </h1>
            <p data-aos="fade-up" className="text-xs text-gray-400">
              Our Best Moments
            </p>
          </div>

          {/* Body Section */}
          {/* Show loading component while fetching */}
          {loading ? (<Loading 
              message="Loading albums..." 
              size="medium" 
              color="primary"
              minHeight="400px"
            /> ) : (
              <>
              
          <div>
            <div className={getGridClass(displayedImages.length)}>
              {displayedImages.map((data) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={data.aosDelay}
                  key={data.id}
                  onClick={() => handleGalleryPopup(data.id)}
                  className="space-y-4 cursor-pointer hover:bg-secondary p-4 rounded-lg transition-colors duration-800 w-full max-w-[350px]"
                >
                  <img
                    src={data.img || Img1}
                    alt={data.title}
                    className="h-[300px] w-full object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{data.title}</h3>
                    <p
                        data-aos="fade-up"
                        className="text-sm text-gray-600 tracking-wide leading-6 line-clamp-3 overflow-hidden"
                      >
                        {data.desc}
                      </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Toggle Button */}
            {galleryData.length > 5 && (
              <div className="text-center mt-12">
                <button
                  data-aos="fade-up"
                  className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary hover:text-black transition-colors duration-300 cursor-pointer"
                  type="button"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
              </>
            )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;