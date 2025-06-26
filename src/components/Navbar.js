import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function NavigationBar() {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length > 0) {
      const res = await fetch(`https://dummyjson.com/products/search?q=${value}`);
      const data = await res.json();
      setSuggestions(data.products.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchQuery}`);
    setSuggestions([]);
    setExpanded(false);
  };

  const toggleDropdown = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
    setShowCategories(false);
    setSuggestions([]);
    setExpanded(false);
  };

  return (
    <>
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        className="navbar-custom py-2"
        variant="light"
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
            <img src="/Logo.svg" alt="Logo" width="32" height="32" />
            <span style={{ color: "#fff", fontWeight: "bold", fontSize: "1.2rem" }}>
              Blue Mart
            </span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" className="bg-light" />

          <Navbar.Collapse id="navbarScroll">
            {/* ✅ Search Bar */}
            <Form
              onSubmit={handleSearch}
              className="my-3 my-lg-0 mx-lg-auto position-relative w-100"
              style={{ maxWidth: "500px" }}
            >
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <Button type="submit" variant="light">
                  <FaSearch />
                </Button>
              </InputGroup>

              {suggestions.length > 0 && (
                <div
                  className="bg-white shadow rounded p-2 position-absolute w-100 z-3 mt-1"
                  style={{ top: "100%", left: 0 }}
                >
                  {suggestions.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setSearchQuery("");
                        setSuggestions([]);
                        setExpanded(false);
                      }}
                      style={{ cursor: "pointer", padding: "5px 10px", color: "#333" }}
                    >
                      {product.title}
                    </div>
                  ))}
                </div>
              )}
            </Form>

            {/* ✅ Nav Links */}
            <Nav className="ms-auto d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <Nav.Link
                as="span"
                onClick={() => {
                  toggleDropdown();
                  setExpanded(false);
                }}
                className="nav-link nav-underline-hover text-white"
                style={{ cursor: "pointer" }}
              >
                Categories
              </Nav.Link>

              <Nav.Link as={Link} to="/products" onClick={() => setExpanded(false)} className="text-white nav-underline-hover">
                Products
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/cart"
                onClick={() => setExpanded(false)}
                className="text-white position-relative d-flex align-items-center gap-1 nav-underline-hover"
              >
                <FaShoppingCart />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </Nav.Link>

              <Nav.Link as={Link} to="/checkout" onClick={() => setExpanded(false)} className="text-white nav-underline-hover">
                Checkout
              </Nav.Link>

              <Nav.Link as={Link} to="/login" onClick={() => setExpanded(false)} className="text-white nav-underline-hover">
                Login
              </Nav.Link>

              <Nav.Link href="#contact-section" onClick={() => setExpanded(false)} className="text-white nav-underline-hover">
                Contact Us
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ✅ Categories Dropdown */}
      {showCategories && (
        <div className="bg-light py-2 shadow-sm">
          <Container>
            <div className="d-flex gap-4 flex-wrap justify-content-center">
              {[
                "smartphones",
                "laptops",
                "fragrances",
                "groceries",
                "home-decoration",
                "furniture",
                "tops",
              ].map((cat) => (
                <span
                  key={cat}
                  className="text-primary fw-semibold"
                  style={{ cursor: "pointer", textTransform: "capitalize" }}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default NavigationBar;
