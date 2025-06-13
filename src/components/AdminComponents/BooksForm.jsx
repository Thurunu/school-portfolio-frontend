import React, { useState, useEffect } from "react";
import GeneralForm from "./GeneralForm";
import axios from "axios";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const BooksForm = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/library");

        // console.log("Response Data:", response.data);
        const categories = response.data.map((category) => ({
          value: category.category_id,
          label: category.category,
        }));

        setAllCategories(categories);
        // console.log("Fetched Categories:", categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const newsFields = [
    {
      name: "grade",
      label: "Grade",
      type: "select",
      placeholder: "Choose a category",
      required: true,
      options: allCategories,
    },
    {
      name: "bookTitle",
      label: "Book Title",
      type: "text",
      placeholder: "Enter book title",
      required: true,
    },
    {
      name: "downloadLink",
      label: "Download Link",
      type: "text",
      placeholder: "paste download link",
      required: true,
    },
  ];

  const booksDataModel = [
    { frontendKey: "grade", backendKey: "category_id" },
    { frontendKey: "bookTitle", backendKey: "book_name" },
    { frontendKey: "downloadLink", backendKey: "book_download_url" },
    { frontendKey: "imageBase64", backendKey: "book_img" },
  ];

  const handleBookSubmit = async (formData) => {
    const categoryId = formData["grade"];
    const url = `http://localhost:3000/api/library/${categoryId}`;

    // Build the book object
    const book = {};
    booksDataModel.forEach(({ frontendKey, backendKey }) => {
      if (formData.hasOwnProperty(frontendKey)) {
        book[backendKey] = formData[frontendKey];
      }
    });

    const payload = {
      action: "add", // or "remove" if you're implementing a removal UI
      book,
    };

    try {
      const response = await axios.put(url, payload);
      // console.log("Success:", response.data);
      showSuccess(
        "Book Added Successfully!",
        "Your book has been added successfully."
      );
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      showError(
        "Failed to Add Book",
        "There was an error publishing your book. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <GeneralForm
        title="Add Book"
        type="select"
        fields={newsFields}
        onSubmit={handleBookSubmit}
        submitButtonText="Add Book"
        showDateTime={false}
        showImageUpload={true}
      />
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
    </>
  );
};

export default BooksForm;
