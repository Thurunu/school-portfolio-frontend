import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const GalleryPopup = ({ galleryPopup, setGalleryPopup, selectedGallery }) => {
  // Close popup when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setGalleryPopup(false);
    }
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && galleryPopup) {
        setGalleryPopup(false);
      }
    };

    if (galleryPopup) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [galleryPopup, setGalleryPopup]);

  // Don't render if popup is not open
  if (!galleryPopup) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full overflow-hidden">
        {/* Header and Close Button */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedGallery.title || "Gallery"}
          </h2>
          <IoCloseOutline
            className="text-3xl cursor-pointer hover:text-red-500 transition-colors"
            onClick={() => setGalleryPopup(false)}
          />
        </div>

        {/* Gallery Section */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {selectedGallery.images && selectedGallery.images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedGallery.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url || image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onError={(e) => {
                    e.target.style.display = "none"; // Hide broken images
                  }}
                  onClick={() => {
                    // Optional: Add lightbox functionality here
                    window.open(image.url || image, '_blank');
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No images found in this gallery</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPopup;