export const useImageUpload = (allowMultipleImages, setFormData) => {
  const handleImageChange = (e) => {
    const files = e.target.files;

    if (allowMultipleImages) {
      const fileArray = Array.from(files);
      const imagePromises = fileArray.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              file: file,
              preview: reader.result,
              base64: reader.result,
            });
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then((results) => {
        setFormData((prev) => ({
          ...prev,
          selectedImages: [
            ...(prev.selectedImages || []),
            ...results.map((r) => r.file),
          ],
          imagePreviews: [
            ...(prev.imagePreviews || []),
            ...results.map((r) => r.preview),
          ],
          imagesBase64: [
            ...(prev.imagesBase64 || []),
            ...results.map((r) => r.base64),
          ],
        }));
      });
    } else {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            selectedImage: file,
            imagePreview: reader.result,
            imageBase64: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (index) => {
    if (allowMultipleImages) {
      setFormData((prev) => ({
        ...prev,
        selectedImages: prev.selectedImages.filter((_, i) => i !== index),
        imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
        imagesBase64: prev.imagesBase64.filter((_, i) => i !== index),
      }));
    }
  };

  return { handleImageChange, removeImage };
};
