import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Badge, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { CartContext } from "../context/CartContext";
import { useContext, useEffect } from "react";
import { httpService, loggedInUser } from "../httpService";

function MyNavbar() {
  const { cart, setCart } = useContext(CartContext);

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
  }, []);
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="/">
          <Typography variant="h6" fontWeight={"100"}>
            ME-Stores
          </Typography>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/mycart" disabled={loggedInUser ? false : true}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCart />
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
