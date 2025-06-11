import React, { useState } from "react";
import Header from "../components/NavBar/Header";
import EventForm from "../components/AdminComponents/EventForm";
import NewsForm from "../components/AdminComponents/NewsForm";
import LibraryForm from "../components/AdminComponents/LibraryForm";
import BooksForm from "../components/AdminComponents/BooksForm";
import GalleryForm from "../components/AdminComponents/GalleryForm";

const AdminPage = () => {
  const [activeForm, setActiveForm] = useState("news");

  const menuItems = [
    { id: "news", label: "News Management", icon: "📰" },
    { id: "events", label: "Event Management", icon: "📅" },
    { id: "library", label: "Library Management", icon: "📚" },
    { id: "books", label: "Books Management", icon: "📖" },
    { id: "gallery", label: "Gallery Management", icon: "🖼️" },
  ];

  const renderActiveForm = () => {
    switch (activeForm) {
      case "news":
        return <NewsForm />;
      case "events":
        return <EventForm />;
      case "library":
        return <LibraryForm />;
      case "books":
        return <BooksForm />;
      case "gallery":
        return <GalleryForm />;
      default:
        return <NewsForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary py-4 shadow-md fixed top-0 left-0 w-full z-50" >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Header />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 flex min-h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 fixed left-0 top-20 bottom-0 overflow-y-auto">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-primary" >
              Admin Panel
            </h2>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveForm(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeForm === item.id
                        ? "text-white shadow-md transform scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-primary"
                    }`}
                    style={{
                      backgroundColor: activeForm === item.id ? "#7e0102" : undefined,
                    }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 ml-80">
          <div className="p-8">
            {/* Active Form Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {menuItems.find(item => item.id === activeForm)?.label}
              </h3>
              <div className="w-20 h-1 mt-2 rounded bg-primary"></div>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {renderActiveForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;