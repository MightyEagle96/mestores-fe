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
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT}>
      <UserContext.Provider value={{ user, setUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <MyNavbar />
          <MainRoutes />
          <Footer />
        </CartContext.Provider>
      </UserContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
