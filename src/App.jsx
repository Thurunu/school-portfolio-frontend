import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Layout from "./components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import GalleryPage from "./Pages/GalleryPage";
import EventsPage from "./Pages/EventsPage";
import NewsFeedPage from "./Pages/NewsFeedPage";
import AboutPage from "./Pages/AboutPage";
import NewsFeedPopup from "./components/Popup/NewsFeedPopup";
import GalleryPopup from "./components/Popup/GalleryPopup";
import LibraryPage from "./Pages/LibraryPage";
import AdminPage from "./Pages/AdminPage";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const [newsPopup, setNewsPopup] = React.useState(false);
  const [selectedNews, setSelectedNews] = React.useState({
    id: null,
    title: "",
    image: "",
    body: "",
  });
  const [galleryPopup, setGalleryPopup] = React.useState(false);
  const [selectedGallery, setSelectedGallery] = React.useState({
    id: null,
    title: "",
    images: [],
  });

  const handleGalleryPopup = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/gallery/${id}`
      );
      const gallery = response.data;
      // console.log("Gallery id: ", id);
      setSelectedGallery({
        id: gallery.id,
        title: gallery.title,
        images: gallery.img,
      });
      // console.log(selectedGallery);
      setGalleryPopup(true);
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
  };

  const handleNewsPopup = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/news-feed/${id}`
      );
      const news = response.data;
      setSelectedNews({
        id: news.id,
        title: news.title,
        image: news.img,
        body: news.desc,
      });
      // console.log(selectedNews);
      setNewsPopup(true);
    } catch (error) {
      console.error("Error fetching detailed news:", error);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/gallery",
          element: <GalleryPage handleGalleryPopup={handleGalleryPopup} />,
        },
        {
          path: "/events",
          element: <EventsPage />,
        },
        {
          path: "/news-feed",
          element: <NewsFeedPage handleNewsPopup={handleNewsPopup} />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
      ],
      errorElement: <div className="error-page">Page not found</div>,
    },
    {
      path: "/library",
      element: <LibraryPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
  ]);

  return (
    <div className="bg-white">
      <RouterProvider router={router} />
      
      {/* Render popups conditionally - NOT as routes */}
      <NewsFeedPopup
        newsPopup={newsPopup}
        setNewsPopup={setNewsPopup}
        selectedNews={selectedNews}
      />
      
      <GalleryPopup
        galleryPopup={galleryPopup}
        setGalleryPopup={setGalleryPopup}
        selectedGallery={selectedGallery}
      />
    </div>
  );
};

export default App;