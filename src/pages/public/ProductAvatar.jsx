import { ImageListItem, ImageListItemBar, Stack } from "@mui/material";
import React from "react";
import { productAvatars } from "../../data/productLists";

export default function ProductAvatar() {
  return (
    <div>
      <Stack direction={{ lg: "row" }} spacing={2}>
        {productAvatars.map((c) => (
          <div className="col-md-3">
            <ImageListItem>
              <img src={c.image} alt="" />
              <ImageListItemBar title={c.name} />
            </ImageListItem>
          </div>
        ))}
      </Stack>
    </div>
  );
}
