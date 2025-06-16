import React, { useState, useEffect } from "react";
import axios from "axios";
import GeneralForm from "./GeneralForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const EventForm = ({ initialData, onSubmit, submitButtonText = "Create Event" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();
  const eventFields = [
    {
      name: "eventName",
      label: "Event Name",
      type: "text",
      placeholder: "Enter event name",
      required: true,
    },
    {
      name: "eventDescription",
      label: "Event Description",
      type: "textarea",
      placeholder: "Enter event description",
      rows: 4,
      required: true,
    },
    {
      name: "eventDate",
      label: "Event Date",
      type: "date",
      required: true,
    },
    {
      name: "eventTime",
      label: "Event Time",
      type: "time",
      required: true,
    },
  ];

  const eventFeedDataModel = [
    { frontendKey: "eventName", backendKey: "title" },
    { frontendKey: "eventDescription", backendKey: "desc" },
    { frontendKey: "imageBase64", backendKey: "img" },
    { frontendKey: "eventDate", backendKey: "date" },
  ];

  const handleEventSubmit = async (formData) => {
    if (onSubmit) {
      // If onSubmit is provided (for update), use it
      onSubmit(formData);
      return;
    }

    // Otherwise, handle create operation
    const url = "http://localhost:3000/api/events/create";
    const payload = {};
    eventFeedDataModel.forEach(({ frontendKey, backendKey }) => {
      if (formData.hasOwnProperty(frontendKey)) {
        payload[backendKey] = formData[frontendKey];
      }
    });

    try {
      setIsSubmitting(true);
      const response = await axios.post(url, payload);
      showSuccess(
        "Event Created Successfully!",
        "Your event has been created successfully."
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      showError(
        "Failed to Create Event",
        "There was an error publishing your event. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Transform initialData to match form field names
  const getInitialFormData = () => {
    if (!initialData) return {};

    return {
      eventName: initialData.title || "",
      eventDescription: initialData.desc || "",
      eventDate: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : "",
      eventTime: initialData.date ? new Date(initialData.date).toTimeString().slice(0, 5) : "",
      imageBase64: initialData.img || "",
    };
  };

  return (
    <>
      <GeneralForm
        title={submitButtonText}
        fields={eventFields}
        onSubmit={handleEventSubmit}
        submitButtonText={submitButtonText}
        showDateTime={true}
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

export default EventForm;
