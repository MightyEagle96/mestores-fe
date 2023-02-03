import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { products } from "../../data/productLists";
import MyCarousel from "./MyCarousel";
import ProductAvatar from "./ProductAvatar";
import SideCards from "./SideCards";

export default function HomePage() {
  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-lg-2">
          <List>
            {products.map((c) => (
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => window.location.assign(`/products/${c.slug}`)}
                >
                  <ListItemIcon>{c.icon}</ListItemIcon>
                  <ListItemText primary={c.item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
        <div className="col-lg-7">
          <MyCarousel />
        </div>
        <div className="col-lg-3">
          <SideCards />
        </div>
      </div>
      <ProductAvatar />
    </div>
  );
}
