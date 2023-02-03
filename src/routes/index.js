import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import NotFound from "../pages/NotFound";
import ViewProduct from "../pages/public/ViewProduct";

const routes = [
  { path: "/", component: HomePage },
  { path: "/products/:slug", component: ViewProduct },
  { path: "*", component: NotFound },
];

function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((c, i) => (
          <Route key={i} path={c.path} element={<c.component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
export default MainRoutes;
