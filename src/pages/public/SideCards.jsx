import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import React from "react";

const images = [
  {
    text: "Reliable",
    image:
      "https://images.pexels.com/photos/3770000/pexels-photo-3770000.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    text: "Comfort",
    image:
      "https://images.pexels.com/photos/3756345/pexels-photo-3756345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
export default function SideCards() {
  return (
    <div>
      {images.map((c) => (
        <Card className="mb-4">
          <CardActionArea>
            <CardMedia component="img" height="165" image={c.image} alt="img" />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {c.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
