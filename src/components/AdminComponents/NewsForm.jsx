import React, { useState } from "react";
import axios from "axios";
import GeneralForm from "./GeneralForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const NewsForm = ({ initialData, onSubmit, submitButtonText = "Create News" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();
  const newsFields = [
    {
      name: "newsTitle",
      label: "News Title",
      type: "text",
      placeholder: "Enter news title",
      required: true,
    },
    {
      name: "newsDescription",
      label: "News Description",
      type: "textarea",
      placeholder: "Enter news description",
      rows: 4,
      required: true,
    },
  ];

  const newsFeedDataModel = [
    { frontendKey: "newsTitle", backendKey: "title" },
    { frontendKey: "newsDescription", backendKey: "desc" },
    { frontendKey: "imageBase64", backendKey: "img" },
  ];

  const handleNewsSubmit = async (formData) => {
    if (onSubmit) {
      // If onSubmit is provided (for update), use it
      onSubmit(formData);
      return;
    }

    // Otherwise, handle create operation
    const url = "http://localhost:3000/api/news-feed/create";
    const payload = {};
    newsFeedDataModel.forEach(({ frontendKey, backendKey }) => {
      if (formData.hasOwnProperty(frontendKey)) {
        payload[backendKey] = formData[frontendKey];
      }
    });

    try {
      setIsSubmitting(true);
      const response = await axios.post(url, payload);
      showSuccess(
        "News Created Successfully!",
        "Your news has been created successfully."
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      showError(
        "Failed to Create News",
        "There was an error publishing your news. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Transform initialData to match form field names
  const getInitialFormData = () => {
    if (!initialData) return {};

    return {
      newsTitle: initialData.title || "",
      newsDescription: initialData.desc || "",
      imageBase64: initialData.img || "",
    };
  };

  return (
    <>
      <GeneralForm
        title={submitButtonText}
        fields={newsFields}
        onSubmit={handleNewsSubmit}
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

export default NewsForm;
