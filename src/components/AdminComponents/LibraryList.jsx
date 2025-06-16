import React, { useState, useEffect } from "react";
import axios from "axios";
import LibraryForm from "./LibraryForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const LibraryList = ({ operation }) => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();

  useEffect(() => {
    fetchLibraries();
  }, []);

  const fetchLibraries = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/library");
      setLibraries(response.data);
    } catch (error) {
      console.error("Error fetching libraries:", error);
      showError("Error", "Failed to fetch libraries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/library/delete-category/${id}`);
      showSuccess("Success", "Library category deleted successfully");
      fetchLibraries(); // Refresh the list
    } catch (error) {
      console.error("Error deleting library:", error);
      showError("Error", "Failed to delete library category");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      // Transform form data to match backend format
      const payload = {
        category: formData.librarycategory,
        category_id: formData.category_id
      };

      await axios.put(
        `http://localhost:3000/api/library/update-category/${selectedLibrary._id}`,
        payload
      );
      showSuccess("Success", "Library category updated successfully");
      setSelectedLibrary(null);
      fetchLibraries(); // Refresh the list
    } catch (error) {
      console.error("Error updating library:", error);
      showError("Error", "Failed to update library category");
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (selectedLibrary && operation === "update") {
    return (
      <div>
        <button
          onClick={() => setSelectedLibrary(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to List
        </button>
        <LibraryForm
          initialData={selectedLibrary}
          onSubmit={handleUpdate}
          submitButtonText="Update Library Category"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {libraries.map((library) => (
          <div
            key={library._id}
            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
          >
            <div>
              <h3 className="font-semibold">{library.category}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {library.book_count} books
              </p>
            </div>
            <div className="flex gap-2">
              {operation === "update" && (
                <button
                  onClick={() => setSelectedLibrary(library)}
                  className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary"
                >
                  Edit
                </button>
              )}
              {operation === "delete" && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this library category?")) {
                      handleDelete(library._id);
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

export default LibraryList; 