import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsForm from "./NewsForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const NewsList = ({ operation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/news-feed");
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setNews(sortedData);
    } catch (error) {
      console.error("Error fetching news:", error);
      showError("Error", "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/news-feed/delete/${id}`);
      showSuccess("Success", "News deleted successfully");
      fetchNews(); // Refresh the list
    } catch (error) {
      console.error("Error deleting news:", error);
      showError("Error", "Failed to delete news");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      // Transform form data to match backend format
      const payload = {
        title: formData.newsTitle,
        desc: formData.newsDescription,
        img: formData.imageBase64
      };

      await axios.put(
        `http://localhost:3000/api/news-feed/update/${selectedNews._id}`,
        payload
      );
      showSuccess("Success", "News updated successfully");
      setSelectedNews(null);
      fetchNews(); // Refresh the list
    } catch (error) {
      console.error("Error updating news:", error);
      showError("Error", "Failed to update news");
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (selectedNews && operation === "update") {
    return (
      <div>
        <button
          onClick={() => setSelectedNews(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to List
        </button>
        <NewsForm
          initialData={selectedNews}
          onSubmit={handleUpdate}
          submitButtonText="Update News"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2">{item.desc}</p>
            </div>
            <div className="flex gap-2">
              {operation === "update" && (
                <button
                  onClick={() => setSelectedNews(item)}
                  className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary"
                >
                  Edit
                </button>
              )}
              {operation === "delete" && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this news?")) {
                      handleDelete(item._id);
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

export default NewsList; 