import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Gallery from "./components/Gallery/Gallery";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import GalleryPopup from "./components/Popup/GalleryPopup";

const App = () => {
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
      console.log("Gallery id: ", id);
      setSelectedGallery({
        id: gallery.id,
        title: gallery.title,
        images: gallery.images,
      });
      setGalleryPopup(true); // Add this line to open the popup
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
      console.log(selectedNews);
      setNewsPopup(true);
    } catch (error) {
      console.error("Error fetching detailed news:", error);
    }
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white">
      <NavBar />
      <Home />
      <Gallery handleGalleryPopup={handleGalleryPopup} /> {/* Pass the function as prop */}
      <NewsFeed handleNewsPopup={handleNewsPopup} />
      <About />
      <Footer />
      <Popup
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