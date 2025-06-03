import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Gallery from "./components/Gallery/Gallery";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";

const App = () => {
  const [newsPopup, setNewsPopup] = React.useState(false);

  const [selectedNews, setSelectedNews] = React.useState({
    id: null,
    title: "",
    image: "",
    body: "",
  });

  const handleNewsPopup = (id, newsTitle, newsImage, newsBody) => {
    setSelectedNews({
      id: id,
      title: newsTitle,
      image: newsImage,
      body: newsBody,
    });
    setNewsPopup(true);
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
    <div className="bg-whtie">
      <NavBar />
      <Home />
      <Gallery />
      <NewsFeed handleNewsPopup={handleNewsPopup} />
      <About />
      <Footer />
      <Popup
        newsPopup={newsPopup}
        setNewsPopup={setNewsPopup}
        selectedNews={selectedNews}
      />{" "}
    </div>
  );
};

export default App;
