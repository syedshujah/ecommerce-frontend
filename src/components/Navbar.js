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
  };

  const toggleDropdown = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
    setShowCategories(false);
    setSuggestions([]);
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: "#add8e6" }} variant="light" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-between">
            <img src="/Logo.svg" alt="Logo" width="32" height="32" className="me-2" />
            <span style={{ color: "#f8f9fa", fontWeight: "bold" }}>Blue Mart</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form onSubmit={handleSearch} className="mx-auto my-2 my-lg-0 w-100" style={{ maxWidth: "500px" }}>
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
                <div className="position-absolute bg-white shadow rounded w-100 mt-1 z-3 p-2">
                  {suggestions.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setSearchQuery("");
                        setSuggestions([]);
                      }}
                      style={{ cursor: "pointer", padding: "5px 10px", color: "#333" }}
                    >
                      {product.title}
                    </div>
                  ))}
                </div>
              )}
            </Form>

            <Nav className="ms-auto d-flex align-items-center gap-3">
              <span
                className="text-white fw-semibold"
                style={{ cursor: "pointer" }}
                onClick={toggleDropdown}
              >
                Categories
              </span>

              <Nav.Link as={Link} to="/products" style={{ color: "#f5f5f5" }}>
                Products
              </Nav.Link>

              <Nav.Link as={Link} to="/cart" style={{ color: "#f5f5f5", position: "relative" }}>
                <FaShoppingCart />
                <span className="ms-1">Cart</span>
                {cartItems.length > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </Nav.Link>

              <Nav.Link as={Link} to="/checkout" style={{ color: "#f5f5f5" }}>
                Checkout
              </Nav.Link>
              <Nav.Link as={Link} to="/login" style={{ color: "#f5f5f5" }}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Categories Dropdown */}
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
