import React from "react";
import GeneralForm from "./GeneralForm";
import axios from "axios";

const LibraryForm = () => {
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

  const handleLibrarySubmit = async (formData) => {
    console.log("Library Form Data:", formData);
    const url = "http://localhost:3000/api/library/new-category";

    const payload = {};
    eventFeedDataModel.forEach(({ frontendKey, backendKey }) => {
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
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <GeneralForm
      title="Create Category"
      fields={LibraryFields}
      onSubmit={handleLibrarySubmit}
      submitButtonText="Create Category"
      showDateTime={false}
      showImageUpload={false}
    />
  );
};

export default LibraryForm;
