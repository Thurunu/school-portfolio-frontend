import React from 'react'

const SingleImagePreview = ({ preview }) => {
  if (!preview) return null;

  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-semibold mb-2">
        Image Preview:
      </label>
      <div className="border rounded-lg p-2 bg-secondary/70">
        <img
          src={preview}
          alt="Preview"
          className="w-full h-32 object-cover rounded"
        />
      </div>
    </div>
  );
};

export default SingleImagePreview;
