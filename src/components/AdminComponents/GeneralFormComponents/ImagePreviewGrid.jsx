import React from 'react';

const ImagePreviewGrid = ({ previews, selectedImages, onRemove }) => {
  if (!previews || previews.length === 0) return null;

  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-semibold mb-2">
        Image Previews:
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative border rounded-lg p-2 bg-secondary/50"
          >
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 
              flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
            <div className="text-xs text-gray-300 mt-1 truncate">
              {selectedImages[index]?.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ImagePreviewGrid;
