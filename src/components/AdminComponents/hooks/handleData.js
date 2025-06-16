import { useEffect, useState } from "react";

const URLs = {
  books: "http://localhost:3000/api/library", // Consider updating if you want to fetch books by category
  library: "http://localhost:3000/api/library",
  gallery: "http://localhost:3000/api/gallery",
  events: "http://localhost:3000/api/events",
  news: "http://localhost:3000/api/news-feed",
};

const deleteURLs = {
  books: "http://localhost:3000/api/library/delete-book/:id", // book_id
  library: "http://localhost:3000/api/library/delete-category/:id", // category_id
  gallery: "http://localhost:3000/api/gallery/delete/:id",
  events: "http://localhost:3000/api/events/delete/:id",
  news: "http://localhost:3000/api/news-feed/delete/:id",
};

const updateURLs = {
  books: "http://localhost:3000/api/library/:id", // category_id for updating books in a category
  library: "http://localhost:3000/api/library/update-category/:id", // category_id
  gallery: "http://localhost:3000/api/gallery/update/:id",
  events: "http://localhost:3000/api/events/update/:id",
  news: "http://localhost:3000/api/news-feed/update/:id",
};

const createURLs = {
  books: "http://localhost:3000/api/library/:id", // category_id for adding books to a category
  library: "http://localhost:3000/api/library/new-category",
  gallery: "http://localhost:3000/api/gallery/upload",
  events: "http://localhost:3000/api/events/create",
  news: "http://localhost:3000/api/news-feed/create",
};

// Delete function
const deleteItem = async (section, id) => {
  const deleteUrl = deleteURLs[section];
  console.log("Delete")
  if (!deleteUrl) {
    throw new Error(`No delete URL defined for section: ${section}`);
  }

  const url = deleteUrl.replace(":id", id);

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete item: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};



// Update function
const updateItem = async (section, id, formData) => {
  const updateUrl = updateURLs[section];
  
  if (!updateUrl) {
    throw new Error(`No update URL defined for section: ${section}`);
  }

  const url = updateUrl.replace(":id", id);

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update item: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

// Create function
const createItem = async (section, formData) => {
  const createUrl = createURLs[section];
  if (!createUrl) {
    throw new Error(`No create URL defined for section: ${section}`);
  }

  try {
    const response = await fetch(createUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create item: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Create error:", error);
    throw error;
  }
};

const useFetchSectionData = (section) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data function
  const fetchData = async () => {
    if (!section) return;

    const url = URLs[section];
    if (!url) {
      setError(`No URL defined for section: ${section}`);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      const json = await response.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [section]);

// Handle deletion
  const handleDelete = async (id) => {
    try {
      await deleteItem(section, id);
      // Remove the deleted item from local state
      setData((prevData) => prevData.filter((item) => item._id !== id));
      return { success: true };
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Handle update
  const handleUpdate = async (id, formData) => {
    try {
      const updatedItem = await updateItem(section, id, formData);
      // Update the item in local state
      setData((prevData) =>
        prevData.map((item) => (item._id === id ? updatedItem : item))
      );
      return updatedItem;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Handle create
  const handleCreate = async (formData) => {
    try {
      const newItem = await createItem(section, formData);
      // Add the new item to local state
      setData((prevData) => [newItem, ...prevData]);
      return newItem;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Refetch function
  const refetch = () => {
    fetchData();
  };

  return { 
    data, 
    loading, 
    error, 
    handleDelete, 
    handleUpdate, 
    handleCreate, 
    refetch 
  };
};

export { deleteItem, useFetchSectionData as default, updateItem, createItem };
