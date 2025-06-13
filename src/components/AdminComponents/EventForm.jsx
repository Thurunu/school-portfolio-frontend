import React from "react";
import axios from "axios";
import GeneralForm from "./GeneralForm";

const EventForm = () => {
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
    console.log("Event Form Data:", formData);
 const url = "http://localhost:3000/api/events/create";
    
    const payload = {};
  eventFeedDataModel.forEach(({ frontendKey, backendKey }) => {
    console.log("Mapping correct or not: ", formData.hasOwnProperty(frontendKey))
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
      title="Create Event"
      fields={eventFields}
      onSubmit={handleEventSubmit}
      submitButtonText="Create Event"
      showDateTime={true}
      showImageUpload={true}
    />
  );
};

export default EventForm;
