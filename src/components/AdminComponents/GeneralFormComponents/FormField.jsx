import React from 'react';

const FormField = ({ field, value, onChange }) => {
  const commonClasses =
    "w-full px-3 py-2 border rounded-lg bg-primary/40 text-white focus:border-primary focus:outline-none placeholder:text-white/70 transition-colors duration-200";

  const renderInput = () => {
    switch (field.type) {
      case "textarea":
        return (
          // text fields 
          <textarea
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={onChange}
            rows={field.rows || 4}
            placeholder={field.placeholder}
            className={`${commonClasses} resize-vertical`}
            required={field.required}
          />
        );
      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={onChange}
            className={commonClasses}
            required={field.required}
          >
            <option value="" disabled>
              {field.placeholder || "Select an option"}
            </option>
            {field.options?.map((option, index) => {
              const optionValue = typeof option === "object" ? option.value : option;
              const label = typeof option === "object" ? option.label : option;
              return (
                <option key={index} value={optionValue}>
                  {label}
                </option>
              );
            })}
          </select>
        );
      default:
        return (
          <input
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={onChange}
            type={field.type}
            placeholder={field.placeholder}
            className={commonClasses}
            required={field.required}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label
        className="block text-primary text-sm font-semibold mb-2"
        htmlFor={field.name}
      >
        {field.label}
      </label>
      {renderInput()}
    </div>
  );
};

export default FormField;
