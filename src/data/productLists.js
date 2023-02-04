import {
  LocalConvenienceStore,
  PhoneAndroid,
  Checkroom,
} from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faDumbbell,
  faGamepad,
  faChair,
} from "@fortawesome/free-solid-svg-icons";

export const products = [
  { item: "Supermarket", icon: <LocalConvenienceStore />, slug: "supermarket" },
  { item: "Fashion", icon: <Checkroom />, slug: "fashion" },
  { item: "Mobile/Tablet", icon: <PhoneAndroid />, slug: "mobile-tablet" },
  {
    item: "Kitchen",
    icon: <FontAwesomeIcon icon={faCoffee} />,
    slug: "kitchen",
  },
  {
    item: "Sport",
    icon: <FontAwesomeIcon icon={faDumbbell} />,
    sport: "sport",
  },
  {
    item: "Gaming",
    icon: <FontAwesomeIcon icon={faGamepad} />,
    sport: "gaming",
  },
  {
    item: "Furniture",
    icon: <FontAwesomeIcon icon={faChair} />,
    sport: "furniture",
  },
];

export const carouselItems = [
  {
    h3: "Your Number 1 stop for all products",
    p: "Nulla vitae elit libero, a pharetra augue mollis interdum",
    image:
      "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    h3: "Your Number 1 stop for all products",
    p: "Nulla vitae elit libero, a pharetra augue mollis interdum",
    image:
      "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    h3: "Your Number 1 stop for all products",
    p: "Nulla vitae elit libero, a pharetra augue mollis interdum",
    image:
      "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const productAvatars = [
  {
    name: "Games",
    image:
      "https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Fashion",
    image:
      "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Electronics",
    image:
      "https://images.pexels.com/photos/792345/pexels-photo-792345.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Furniture",
    image:
      "https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const productsDetails = [
  {
    slug: "fashion",
    products: [
      {
        slug: "fashion",
        name: "Suits",
        description: "Perfect for you",
        price: 37500,
        image:
          "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg",
      },
      {
        slug: "fashion",
        name: "Italian Suit",
        description: "Perfect for you",
        price: 55000,
        image:
          "https://images.pexels.com/photos/1096849/pexels-photo-1096849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        slug: "fashion",
        name: "Ties & Shoes",
        description: "Perfect for you",
        price: 34500,
        image:
          "https://images.pexels.com/photos/63196/pexels-photo-63196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        slug: "fashion",
        name: "Wrist Watches",
        description: "Perfect for you",
        price: 14000,
        image:
          "https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        slug: "fashion",
        name: "Wrist Watches",
        description: "Perfect for you",
        price: 15000,
        image:
          "https://images.pexels.com/photos/1120275/pexels-photo-1120275.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  },
];
