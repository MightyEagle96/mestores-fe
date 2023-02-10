import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import NotFound from "../pages/NotFound";
import ViewProduct from "../pages/public/ViewProduct";
import MyCart from "../pages/public/MyCart";
import ConfirmOrder from "../pages/public/ConfirmOrder";
import LoginPage from "../pages/public/LoginPage";
import MyOrders from "../pages/public/MyOrders";
import { loggedInUser } from "../httpService";

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/products/:slug", component: ViewProduct },
  { path: "/mycart", component: MyCart },
  { path: "/paymentsuccessful/:cartId", component: ConfirmOrder },
  { path: "/login", component: LoginPage },
  { path: "*", component: NotFound },
];

export const privateRoutes = [
  { path: "/myorders", component: MyOrders },
  { path: "/", component: HomePage },
  { path: "/products/:slug", component: ViewProduct },
  { path: "/mycart", component: MyCart },
  { path: "/paymentsuccessful/:cartId", component: ConfirmOrder },
];

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {loggedInUser ? (
          <>
            {privateRoutes.map((c, i) => (
              <Route key={i} path={c.path} element={<c.component />} />
            ))}
          </>
        ) : (
          <>
            {publicRoutes.map((c, i) => (
              <Route key={i} path={c.path} element={<c.component />} />
            ))}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
export default MainRoutes;
