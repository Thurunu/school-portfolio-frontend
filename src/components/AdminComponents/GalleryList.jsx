import React, { useState, useEffect } from "react";
import axios from "axios";
import GalleryForm from "./GalleryForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const GalleryList = ({ operation }) => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/gallery");
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setGalleries(sortedData);
    } catch (error) {
      console.error("Error fetching galleries:", error);
      showError("Error", "Failed to fetch galleries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/gallery/delete/${id}`);
      showSuccess("Success", "Gallery deleted successfully");
      fetchGalleries(); // Refresh the list
    } catch (error) {
      console.error("Error deleting gallery:", error);
      showError("Error", "Failed to delete gallery");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      // Transform form data to match backend format
      const payload = {
        title: formData.galleryTitle,
        desc: formData.galleryDescription,
        img: formData.imageBase64
      };

      await axios.put(
        `http://localhost:3000/api/gallery/update/${selectedGallery._id}`,
        payload
      );
      showSuccess("Success", "Gallery updated successfully");
      setSelectedGallery(null);
      fetchGalleries(); // Refresh the list
    } catch (error) {
      console.error("Error updating gallery:", error);
      showError("Error", "Failed to update gallery");
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (selectedGallery && operation === "update") {
    return (
      <div>
        <button
          onClick={() => setSelectedGallery(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to List
        </button>
        <GalleryForm
          initialData={selectedGallery}
          onSubmit={handleUpdate}
          submitButtonText="Update Gallery"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {galleries.map((gallery) => (
          <div
            key={gallery._id}
            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
          >
            <div>
              <h3 className="font-semibold">{gallery.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(gallery.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2">{gallery.desc}</p>
            </div>
            <div className="flex gap-2">
              {operation === "update" && (
                <button
                  onClick={() => setSelectedGallery(gallery)}
                  className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary"
                >
                  Edit
                </button>
              )}
              {operation === "delete" && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this gallery?")) {
                      handleDelete(gallery._id);
                    }
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Popup
        isVisible={popupConfig.isVisible}
        onClose={hidePopup}
        type={popupConfig.type}
        title={popupConfig.title}
        message={popupConfig.message}
        autoClose={popupConfig.autoClose}
        autoCloseDelay={popupConfig.autoCloseDelay}
        showCloseButton={popupConfig.showCloseButton}
      />
    </div>
  );
};

export default GalleryList; 