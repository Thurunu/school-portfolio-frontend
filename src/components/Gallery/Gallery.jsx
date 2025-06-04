import React from "react";
import axios from "axios";
import Img1 from "../../assets/gallery/gallery_image_1.jpg";

const Gallery = ({ handleGalleryPopup }) => {
  const [galleryData, setGalleryData] = React.useState([]);
  const [showAll, setShowAll] = React.useState(false);

  // Fetch image data from API
  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/gallery/first-img"
        );
        setGalleryData(response.data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };
    fetchImages();
  }, []);

  // Determine which images to display
  const displayedImages = showAll ? galleryData : galleryData.slice(0, 5);

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
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
              {displayedImages.map((data) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={data.aosDelay}
                  key={data.id}
                  onClick={() => handleGalleryPopup(data.id)}
                  className="space-y-4 cursor-pointer hover:bg-secondary p-4 rounded-lg transition-colors duration-800"
                >
                  <img
                    src={Img1}
                    alt={data.title}
                    className="h-[300px] w-[350px] object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{data.title}</h3>
                    <p className="text-sm text-gray-600">
                      {data.desc.split(" ").slice(0, 10).join(" ") +
                        (data.desc.split(" ").length > 10 ? "..." : "")}
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
        </div>
      </div>
    </section>
  );
};

export default Gallery;
