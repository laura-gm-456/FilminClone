import React from "react";
import Navbar from "./components/header/navbar";
import './App.css';
import Footer from './components/footer/Footer';



function App() {
  return (
    <div>
      <Navbar />

      <main style={{ marginTop: "60px" }}>
        {/* Aquí va el resto de la página */}
      </main>
      <Footer />
    </div>
  );
};
    
      
  
  


export default App;