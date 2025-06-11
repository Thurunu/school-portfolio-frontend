import React from "react";
import axios from "axios";
import GeneralForm from "./GeneralForm";

const GalleryForm = () => {
  const GalleryFields = [
    {
      name: "galleryName",
      label: "Gallery Name",
      type: "text",
      placeholder: "Enter gallery name",
      required: true,
    },
    {
      name: "galleryDescription",
      label: "Gallery Description",
      type: "textarea",
      placeholder: "Write gallery description",
      rows: 8,
      required: true,
    },
  ];

  const galleryFeedDataModel = [
    { frontendKey: "galleryName", backendKey: "title" },
    { frontendKey: "galleryDescription", backendKey: "desc" },
  ];

  const handleGallerySubmit = async (formData) => {
    // console.log("Gallery Form Data:", formData);
    const url = "http://localhost:3001/api/gallery/upload";

    const payload = {};
    galleryFeedDataModel.forEach(({ frontendKey, backendKey }) => {
      console.log(
        "Mapping correct or not: ",
        formData.hasOwnProperty(frontendKey)
      );
      console.log("Mapping: ", frontendKey, " to ", backendKey);
      if (formData.hasOwnProperty(frontendKey)) {
        payload[backendKey] = formData[frontendKey];
      }
      console.log("Payload after mapping: ", payload);
    });

    if (formData.imagesBase64 && Array.isArray(formData.imagesBase64)) {
      payload.imagePaths = formData.imagesBase64;
    }

    try {
      const response = await axios.post(url, payload);
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <GeneralForm
      title="Create Gallery"
      fields={GalleryFields}
      onSubmit={handleGallerySubmit}
      submitButtonText="Create Gallery"
      showDateTime={false}
      showImageUpload={true}
      allowMultipleImages={true}
    />
  );
};

export default GalleryForm;
