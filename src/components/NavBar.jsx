import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Avatar, Badge, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { CartContext, UserContext } from "../context/CartContext";
import { useContext, useEffect } from "react";
import { httpService, loggedInUser } from "../httpService";
import { googleLogout } from "@react-oauth/google";

function MyNavbar() {
  const { cart, setCart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);

  const viewCart = async () => {
    if (loggedInUser) {
      const res = await httpService(`mestore/mycart/${loggedInUser._id}`);

      if (res && res.data) {
        setCart(res.data.products);
      }
    }
  };

  useEffect(() => {
    viewCart();
    setUser(loggedInUser);
  }, []);
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="/">
          <Typography variant="body1" fontWeight={"700"}>
            ME-Stores
          </Typography>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/mycart" disabled={user ? false : true}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCart />
              </Badge>
            </Nav.Link>
            {user ? (
              <NavDropdown title={user.firstName} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  My Orders
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.1">
                  <Avatar src={user.picture} />
                </NavDropdown.Item> */}
                <NavDropdown.Item
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem(process.env.REACT_APP_PROJECT_USER);
                    window.location.reload();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
