import React from 'react';
import ImagePreviewGrid from './ImagePreviewGrid';
import SingleImagePreview from './SingleImagePreview';

const ImageUpload = ({
  allowMultipleImages,
  formData,
  onImageChange,
  onRemoveImage
}) => {
  return (
    <>
      <div className="mb-4">
        <label
          className="block text-primary text-sm font-semibold mb-2"
          htmlFor="imageUpload"
        >
          {allowMultipleImages ? "Images" : "Image"}
        </label>
        <input
          id="imageUpload"
          name="imageUpload"
          onChange={onImageChange}
          className="w-full px-3 py-2 border rounded-lg bg-primary/50 text-white focus:primary/50 
          focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm 
          file:font-semibold file:bg-blue-50 file:text-primary/70 hover:file:bg-blue-100"
          type="file"
          accept="image/*"
          multiple={allowMultipleImages}
        />

        {/* Display selected files info */}
        {allowMultipleImages
          ? formData.selectedImages &&
            formData.selectedImages.length > 0 && (
              <div className="mt-2 text-green-400 text-sm">
                Selected: {formData.selectedImages.length} image(s)
              </div>
            )
          : formData.selectedImage && (
              <div className="mt-2 text-green-400 text-sm">
                Selected: {formData.selectedImage.name}
              </div>
            )}
      </div>

      {/* Image Previews */}
      {allowMultipleImages ? (
        <ImagePreviewGrid 
          previews={formData.imagePreviews}
          selectedImages={formData.selectedImages}
          onRemove={onRemoveImage}
        />
      ) : (
        <SingleImagePreview preview={formData.imagePreview} />
      )}
    </>
  );
};

export default ImageUpload;
