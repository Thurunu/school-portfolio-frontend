import React, { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import Popup from "./GeneralFormComponents/Popup";
import { usePopup } from "./hooks/usePopup";

const BookList = ({ operation }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const { popupConfig, showSuccess, showError, hidePopup } = usePopup();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchBooks(selectedCategory.category_id);
    }
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/library");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showError("Error", "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async (categoryId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/library/${categoryId}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      showError("Error", "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/api/library/delete-book/${bookId}`);
      showSuccess("Success", "Book deleted successfully");
      if (selectedCategory) {
        fetchBooks(selectedCategory.category_id);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      showError("Error", "Failed to delete book");
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const payload = {
        book_name: formData.bookName,
        book_img: formData.imageBase64,
        book_download_url: formData.bookDownloadUrl
      };

      const response = await axios.put(
        `http://localhost:3000/api/library/book-update/${selectedBook.book_id}`,
        payload
      );

      if (response.data) {
        showSuccess("Success", "Book updated successfully");
        setSelectedBook(null);
        fetchBooks(selectedCategory.category_id);
      }
    } catch (error) {
      console.error("Error updating book:", error);
      showError("Error", "Failed to update book");
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (selectedBook && operation === "update") {
    return (
      <div>
        <button
          onClick={() => setSelectedBook(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to List
        </button>
        <BookForm
          initialData={selectedBook}
          onSubmit={handleUpdate}
          submitButtonText="Update Book"
        />
      </div>
    );
  }

  if (!selectedCategory) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Select a Category</h2>
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
            >
              <div>
                <h3 className="font-semibold">{category.category}</h3>
                <p className="text-sm text-gray-500">
                  {category.book_count} books
                </p>
              </div>
              <button
                onClick={() => setSelectedCategory(category)}
                className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary"
              >
                View Books
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to Categories
        </button>
        <h2 className="text-xl font-semibold">
          Books in {selectedCategory.category}
        </h2>
      </div>

      <div className="space-y-4">
        {books.map((book) => (
          <div
            key={book.book_id}
            className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              {book.book_img && (
                <img
                  src={book.book_img}
                  alt={book.book_name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h3 className="font-semibold">{book.book_name}</h3>
                <a
                  href={book.book_download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Download Link
                </a>
              </div>
            </div>
            <div className="flex gap-2">
              {operation === "update" && (
                <button
                  onClick={() => setSelectedBook(book)}
                  className="px-3 py-1 bg-primary text-white rounded hover:bg-secondary"
                >
                  Edit
                </button>
              )}
              {operation === "delete" && (
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this book?")) {
                      handleDelete(book.book_id);
                    }
                  }}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Popup
        isVisible={popupConfig.isVisible}
        onClose={hidePopup}
        type={popupConfig.type}
        title={popupConfig.title}
        message={popupConfig.message}
        autoClose={popupConfig.autoClose}
        autoCloseDelay={popupConfig.autoCloseDelay}
        showCloseButton={popupConfig.showCloseButton}
      />
    </div>
  );
};

export default BookList; 