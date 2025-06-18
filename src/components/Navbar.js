import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import CategoryDropdown from './CategoryDropdown'

function NavigationBar() {
   const [showDropdown, setShowDropdown] = useState(false)

   const handleToggle =()=>{
    setShowDropdown(prev => !prev)
   }
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#add8e6" }} variant="light">
     <Container style={{ maxWidth: "97%" }}>
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Left: Brand */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="text-light d-flex align-items-center"
          >
            <img
              src="/Logo.svg"
              alt="Blue Mart Logo"
              width="32"
              height="32"
              className="me-2"
            />
            <span style={{ color: "#f8f9fa", fontWeight: "bold" }}>
              Blue Mart
            </span>
          </Navbar.Brand>

          {/* Center: Search Bar */}
          <Form className="d-flex mx-3" style={{ width: "40%" }}>
            <InputGroup>
              <FormControl
                type="search"
                placeholder="Search products"
                aria-label="Search"
              />
              <InputGroup.Text style={{ backgroundColor: "#fff" }}>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>

          {/* Right: Nav Links */}
          <Nav className="d-flex gap-3 align-items-center">
            <Nav.Link as={Link} to="/products" style={{ color: "#f5f5f5" }}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/products" style={{ color: "#f5f5f5" }}
             onClick={handleToggle}>Shop by Category</Nav.Link>
             {showDropdown && <CategoryDropdown/>}

            <Nav.Link as={Link} to="/cart" style={{ color: "#f5f5f5" }}>
              <FaShoppingCart /> Cart
            </Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
