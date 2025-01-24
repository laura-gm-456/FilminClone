import './App.css';
import Footer from './components/footer/Footer';
import React from "react";
import Navbar from "./components/header/navbar/navbar";
import Content from './components/content/Content';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaEnConstruccion from "./components/construction";

const AppContent = () => {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/construction" element={<PaginaEnConstruccion />} />
        <Route path="/" element={<Content />} />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
