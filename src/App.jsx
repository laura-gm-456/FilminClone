import React from "react";
import Navbar from "./components/header/navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <main style={{ marginTop: "60px" }}>
        {/* Aquí va el resto de la página */}
      </main>
    </div>
  );
};

export default App;