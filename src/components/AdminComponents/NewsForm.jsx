import React from 'react';
import GeneralForm from './GeneralForm'; 
import axios from 'axios';

const NewsForm = () => {
  const newsFields = [
    {
      name: 'newsHeadline',
      label: 'Headline',
      type: 'text',
      placeholder: 'Enter news headline',
      required: true
    },
    {
      name: 'newsDescription',
      label: 'News',
      type: 'textarea',
      placeholder: 'Write news content',
      rows: 8,
      required: true
    },
    {
      name: 'newsDate',
      label: 'News Date',
      type: 'date',
      required: true
    }
  ];

const newsFeedDataModel = [
  { frontendKey: "newsHeadline", backendKey: "title" },
  { frontendKey: "newsDescription", backendKey: "desc" },
  { frontendKey: "imageBase64", backendKey: "img" },
];



  const handleNewsSubmit = async (formData) => {
    console.log('News Form Data:', formData);
    const url = "http://localhost:3000/api/news-feed/create";
    
    const payload = {};
  newsFeedDataModel.forEach(({ frontendKey, backendKey }) => {
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
      title="Create News"
      fields={newsFields}
      onSubmit={handleNewsSubmit}
      submitButtonText="Create News"
      showDateTime={false}
      showImageUpload={true}
     
    />
  );
};

export default NewsForm
