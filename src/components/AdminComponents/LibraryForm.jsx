import React, { useState } from "react";
import GeneralForm from "./GeneralForm";
import axios from "axios";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const LibraryForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();
  const LibraryFields = [
    {
      name: "Category",
      label: "Category",
      type: "text",
      placeholder: "Enter a category",
      required: true,
    },
    {
      name: "Category ID",
      label: "Category ID",
      type: "text",
      placeholder: "Enter category ID",
      required: true,
    },
  ];

  const eventFeedDataModel = [
    { frontendKey: "Category", backendKey: "category" },
    { frontendKey: "Category ID", backendKey: "category_id" },
  ];

  const handleLibrarySubmit = async (formData, resetForm) => {
    // console.log("Library Form Data:", formData);
    const url = "http://localhost:3000/api/library/new-category";

    const payload = {};
    eventFeedDataModel.forEach(({ frontendKey, backendKey }) => {
      // console.log(
      //   "Mapping correct or not: ",
      //   formData.hasOwnProperty(frontendKey)
      // );
      if (formData.hasOwnProperty(frontendKey)) {
        payload[backendKey] = formData[frontendKey];
      }
    });

    try {
      const response = await axios.post(url, payload);
      // console.log("Success:", response.data);
      // Show success popup and reset form

      showSuccess(
        "New Category Created Successfully!",
        "New category has been created successfully."
      );
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      // Show error popup
      showError(
        "Failed to Create Category",
        "There was an error creating the new category. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <GeneralForm
        title="Create Category"
        fields={LibraryFields}
        onSubmit={handleLibrarySubmit}
        submitButtonText="Create Category"
        showDateTime={false}
        showImageUpload={false}
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

export default LibraryForm;
