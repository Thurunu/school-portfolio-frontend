import React, { useState } from "react";
import axios from "axios";
import GeneralForm from "./GeneralForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const EventForm = () => {
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
    // console.log("Event Form Data:", formData);
    const url = "http://localhost:3000/api/events/create";

    const payload = {};
    eventFeedDataModel.forEach(({ frontendKey, backendKey }) => {
      // console.log("Mapping correct or not: ", formData.hasOwnProperty(frontendKey))
      if (formData.hasOwnProperty(frontendKey)) {
        payload[backendKey] = formData[frontendKey];
      }
    });

    try {
      const response = await axios.post(url, payload);
      // console.log("Success:", response.data);

      showSuccess(
        "Event Created Successfully!",
        "Your event has been created successfully."
      );
      resetForm();
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

  return (
    <>
      <GeneralForm
        title="Create Event"
        fields={eventFields}
        onSubmit={handleEventSubmit}
        submitButtonText="Create Event"
        showDateTime={true}
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

export default EventForm;
