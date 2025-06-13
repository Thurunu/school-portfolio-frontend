import React from 'react';

const DateTimeDisplay = ({ fields, formData }) => {
  const formatDateTime = () => {
    const dateField = fields.find((f) => f.type === "date");
    const timeField = fields.find((f) => f.type === "time");

    if (
      dateField &&
      timeField &&
      formData[dateField.name] &&
      formData[timeField.name]
    ) {
      const date = new Date(
        formData[dateField.name] + "T" + formData[timeField.name]
      );
      return date.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
  };

  const formattedDateTime = formatDateTime();

  if (!formattedDateTime) return null;

  return (
    <div className="mb-4 p-3 bg-primary/50 rounded-lg">
      <label className="block text-white text-sm font-semibold mb-2">
        Selected Date & Time:
      </label>
      <div className="text-white text-sm">{formattedDateTime}</div>
    </div>
  );
};

export default DateTimeDisplay
