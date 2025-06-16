import React, { useState } from "react";
import Header from "../components/NavBar/Header";
import EventForm from "../components/AdminComponents/EventForm";
import NewsForm from "../components/AdminComponents/NewsForm";
import LibraryForm from "../components/AdminComponents/LibraryForm";
import BooksForm from "../components/AdminComponents/BooksForm";
import GalleryForm from "../components/AdminComponents/GalleryForm";
import EventList from "../components/AdminComponents/EventList";
import NewsList from "../components/AdminComponents/NewsList";
import GalleryList from "../components/AdminComponents/GalleryList";
import LibraryList from "../components/AdminComponents/LibraryList";
import BookList from "../components/AdminComponents/BookList";

const AdminPage = () => {
  const [activeForm, setActiveForm] = useState("news");
  const [activeOperation, setActiveOperation] = useState("create"); // create, update, delete

  const menuItems = [
    { id: "news", label: "News Management", icon: "📰" },
    { id: "events", label: "Event Management", icon: "📅" },
    { id: "library", label: "Library Management", icon: "📚" },
    { id: "books", label: "Books Management", icon: "📖" },
    { id: "gallery", label: "Gallery Management", icon: "🖼️" },
  ];

  const operations = [
    { id: "create", label: "Create" },
    { id: "update", label: "Update" },
    { id: "delete", label: "Delete" },
  ];

  const renderActiveForm = () => {
    if (activeOperation === "create") {
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
    } else if (activeOperation === "update" || activeOperation === "delete") {
      switch (activeForm) {
        case "news":
          return <NewsList operation={activeOperation} />;
        case "events":
          return <EventList operation={activeOperation} />;
        case "gallery":
          return <GalleryList operation={activeOperation} />;
        case "library":
          return <LibraryList operation={activeOperation} />;
        case "books":
          return <BookList operation={activeOperation} />;
        default:
          return <NewsList operation={activeOperation} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary py-4 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Header />
        </div>
      </div>

      {/* Main Content - Add top padding to account for fixed header */}
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {/* Left Sidebar - Options Panel */}
            <div className="w-80 bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
              {/* Operation Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Operation</h2>
                <div className="flex flex-col gap-3">
                  {operations.map((op) => (
                    <button
                      key={op.id}
                      onClick={() => setActiveOperation(op.id)}
                      className={`w-full px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        activeOperation === op.id
                          ? "bg-primary text-white"
                          : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Type Selection */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Select Management</h2>
                <div className="flex flex-col gap-3">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveForm(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        activeForm === item.id
                          ? "bg-primary text-white"
                          : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                  {activeOperation} {activeForm}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeOperation === "create" 
                    ? `Create new ${activeForm} content` 
                    : `${activeOperation} existing ${activeForm} content`
                  }
                </p>
              </div>
              <div className="border-t pt-6">
                {renderActiveForm()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;