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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Operation Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Operation</h2>
            <div className="flex gap-4">
              {operations.map((op) => (
                <button
                  key={op.id}
                  onClick={() => setActiveOperation(op.id)}
                  className={`px-4 py-2 rounded ${
                    activeOperation === op.id
                      ? "bg-primary text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Type Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Content Type</h2>
            <div className="flex flex-wrap gap-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveForm(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded ${
                    activeForm === item.id
                      ? "bg-primary text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Form/List */}
          <div className="mt-8">{renderActiveForm()}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;