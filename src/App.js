import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import MyNavbar from "./components/NavBar";
import MainRoutes from "./routes";
import { CartContext } from "./context/CartContext";
import React, { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <MyNavbar />
      <MainRoutes />
    </CartContext.Provider>
  );
}

export default App;
