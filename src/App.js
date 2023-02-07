import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import "./App.css";
import MyNavbar from "./components/NavBar";
import MainRoutes from "./routes";
import { CartContext, UserContext } from "./context/CartContext";
import React, { useState } from "react";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <MyNavbar />
        <MainRoutes />
        <Footer />
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
