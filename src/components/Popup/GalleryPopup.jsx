import React from "react";
import axios from "axios"; 
import { IoCloseOutline } from "react-icons/io5";

const GalleryPopup = ({ galleryPopup, setGalleryPopup, selectedGallery }) => {
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchImages = async () => {
      // Only fetch if popup is open and we have a gallery ID
      if (!galleryPopup || !selectedGallery.id) return;
      
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/gallery/${selectedGallery.id}`
        );
        setImages(response.data.img || []); 
        console.log("Fetched images:", response.data.img);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [galleryPopup, selectedGallery.id]);



  return (
    <>
      {galleryPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed inset-0 m-[100px] bg-white p-6 rounded-md shadow-lg z-50 w-[calc(100vw-200px)] h-[calc(100vh-200px)] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-black">
                {selectedGallery.title}
              </h1>
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => setGalleryPopup(false)}
              />
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center h-32">
                <div className="text-lg">Loading images...</div>
              </div>
            )}

            {/* Gallery Section */}
            {!loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url || image.src || image} // Multiple fallbacks for different data structures
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        e.target.style.display = 'none'; // Hide broken images
                      }}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500">
                    No images found in this gallery
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryPopup;