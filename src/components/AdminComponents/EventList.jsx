import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./EventForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const EventList = ({ operation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/events");
      const sortedData = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setEvents(sortedData);
    } catch (error) {
      console.error("Error fetching events:", error);
      showError("Error", "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/events/delete/${id}`);
      showSuccess("Success", "Event deleted successfully");
      fetchEvents(); // Refresh the list
    } catch (error) {
      console.error("Error deleting event:", error);
      showError("Error", "Failed to delete event");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      // Transform form data to match backend format
      const payload = {
        title: formData.eventName,
        desc: formData.eventDescription,
        img: formData.imageBase64,
        date: new Date(`${formData.eventDate}T${formData.eventTime}`).toISOString()
      };

      await axios.put(
        `http://localhost:3000/api/events/update/${selectedEvent._id}`,
        payload
      );
      showSuccess("Success", "Event updated successfully");
      setSelectedEvent(null);
      fetchEvents(); // Refresh the list
    } catch (error) {
      console.error("Error updating event:", error);
      showError("Error", "Failed to update event");
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (selectedEvent && operation === "update") {
    return (
      <div>
        <button
          onClick={() => setSelectedEvent(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to List
        </button>
        <EventForm
          initialData={selectedEvent}
          onSubmit={handleUpdate}
          submitButtonText="Update Event"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event._id}
            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
          >
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 line-clamp-2">{event.desc}</p>
            </div>
            <div className="flex gap-2">
              {operation === "update" && (
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary"
                >
                  Edit
                </button>
              )}
              {operation === "delete" && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this event?")) {
                      handleDelete(event._id);
                    }
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default EventList; 