import { useState } from "react";
import "./App.css";
import "daisyui/dist/full.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import SearchPlanet from "./components/SearchPlanet/SearchPlanet";
import Footer from "./components/Footer/Footer";
import Destinations from "./components/Destinations/Destinations";
import About from "./components/About/About";
import NotFound from "./components/NotFound/NotFound";
import Profil from "./components/Profil/Profil";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPlanet />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

{
  /* <div className="bg-blue-500 text-white p-4">
        C'est un exemple de composant React avec Tailwind CSS.
      </div>
      <button className="btn btn-primary">Bouton Daisy UI</button>
      <div className="join join-vertical">
        <button className="btn join-item">Button</button>
        <button className="btn join-item">Button</button>
        <button className="btn join-item">Button</button>
        <button className="btn btn-primary join-item">Bouton Daisy UI</button>
      </div>
      <div className="container mx-auto p-4"></div>
      </div> */
}
