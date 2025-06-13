import React, { useState } from "react";
import GeneralForm from "./GeneralForm";
import axios from "axios";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const NewsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();
  const newsFields = [
    {
      name: "newsHeadline",
      label: "Headline",
      type: "text",
      placeholder: "Enter news headline",
      required: true,
    },
    {
      name: "newsDescription",
      label: "News",
      type: "textarea",
      placeholder: "Write news content",
      rows: 8,
      required: true,
    },
    {
      name: "newsDate",
      label: "News Date",
      type: "date",
      required: true,
    },
  ];

  const newsFeedDataModel = [
    { frontendKey: "newsHeadline", backendKey: "title" },
    { frontendKey: "newsDescription", backendKey: "desc" },
    { frontendKey: "imageBase64", backendKey: "img" },
  ];

  const handleNewsSubmit = async (formData, resetForm) => {
    // console.log('News Form Data:', formData);
    const url = "http://localhost:3000/api/news-feed/create";
    setIsSubmitting(true);

    const payload = {};
    newsFeedDataModel.forEach(({ frontendKey, backendKey }) => {
      console.log(
        "Mapping correct or not: ",
        formData.hasOwnProperty(frontendKey)
      );
      if (formData.hasOwnProperty(frontendKey)) {
        payload[backendKey] = formData[frontendKey];
      }
    });

    try {
      const response = await axios.post(url, payload);
      // console.log("Success:", response.data);

      // Show success popup and reset form
      showSuccess(
        "News Created Successfully!",
        "Your news article has been published successfully."
      );
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error popup
      showError(
        "Failed to Create News",
        "There was an error publishing your news article. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <GeneralForm
        title="Create News"
        fields={newsFields}
        onSubmit={handleNewsSubmit}
        submitButtonText={isSubmitting ? "Creating..." : "Create News"}
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

export default NewsForm;
