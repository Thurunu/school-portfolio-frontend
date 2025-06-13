import { useState } from 'react';

export const usePopup = () => {
  const [popupConfig, setPopupConfig] = useState({
    isVisible: false,
    type: 'success',
    title: '',
    message: '',
    autoClose: true,
    autoCloseDelay: 3000,
    showCloseButton: true,
  });

  const showPopup = (config) => {
    setPopupConfig({
      ...popupConfig,
      ...config,
      isVisible: true,
    });
  };

  const hidePopup = () => {
    setPopupConfig(prev => ({
      ...prev,
      isVisible: false,
    }));
  };

  const showSuccess = (title, message, options = {}) => {
    showPopup({
      type: 'success',
      title,
      message,
      ...options,
    });
  };

  const showError = (title, message, options = {}) => {
    showPopup({
      type: 'error',
      title,
      message,
      autoClose: false, // Errors usually shouldn't auto-close
      ...options,
    });
  };

  const showWarning = (title, message, options = {}) => {
    showPopup({
      type: 'warning',
      title,
      message,
      ...options,
    });
  };

  const showInfo = (title, message, options = {}) => {
    showPopup({
      type: 'info',
      title,
      message,
      ...options,
    });
  };

  return {
    popupConfig,
    showPopup,
    hidePopup,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};