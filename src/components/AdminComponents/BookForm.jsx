import React, { useState } from "react";
import axios from "axios";
import GeneralForm from "./GeneralForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const BookForm = ({ initialData, onSubmit, submitButtonText = "Create Book" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();
  const bookFields = [
    {
      name: "bookName",
      label: "Book Name",
      type: "text",
      placeholder: "Enter book name",
      required: true,
    },
    {
      name: "downloadUrl",
      label: "Download URL",
      type: "text",
      placeholder: "Enter download URL",
      required: true,
    },
  ];

  const handleBookSubmit = async (formData) => {
    if (onSubmit) {
      // If onSubmit is provided (for update), use it
      onSubmit(formData);
      return;
    }

    // Otherwise, handle create operation
    const url = "http://localhost:3000/api/library/create-book";
    const payload = {
      book_name: formData.bookName,
      book_img: formData.imageBase64,
      book_download_url: formData.downloadUrl
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post(url, payload);
      showSuccess(
        "Book Created Successfully!",
        "Your book has been created successfully."
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      showError(
        "Failed to Create Book",
        "There was an error creating the book. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Transform initialData to match form field names
  const getInitialFormData = () => {
    if (!initialData) return {};

    return {
      bookName: initialData.book_name || "",
      downloadUrl: initialData.book_download_url || "",
      imageBase64: initialData.book_img || "",
    };
  };

  return (
    <>
      <GeneralForm
        title={submitButtonText}
        fields={bookFields}
        onSubmit={handleBookSubmit}
        submitButtonText={submitButtonText}
        showImageUpload={true}
        initialData={getInitialFormData()}
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

export default BookForm; 