import React from 'react'
import AOS from "aos";
import "aos/dist/aos.css";

import NavBar from './components/NavBar/NavBar'
import Home from './components/Home/Home'
import Gallery from './components/Gallery/Gallery'
import NewsFeed from './components/NewsFeed/NewsFeed';


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
  return (
    <div>
      <NavBar />
      <Home />
      <Gallery />
      <NewsFeed />
    </div>
  )
}

export default App
