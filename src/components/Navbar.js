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
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showCategories, setShowCategories] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
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

  const handleCategoryClick = (cat) => {
    navigate(`/products?category=${cat}`);
    setShowCategories(false);
    setSuggestions([]);
  };

  return (
    <>
      <Navbar expand="lg" sticky="top" className="bg-light shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
            <img
              src="/Logo.svg"
              alt="Blue Mart"
              width="32"
              height="32"
              className="me-2"
            />
            Blue Mart
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto my-2 my-lg-0 d-flex align-items-lg-center gap-3">
              <span
                onClick={() => setShowCategories(!showCategories)}
                className="text-dark fw-semibold"
                style={{ cursor: "pointer" }}
              >
                Categories
              </span>

              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/checkout">Checkout</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/cart" className="position-relative">
                <FaShoppingCart />
                <span className="ms-1">Cart</span>
                {cartItems.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                )}
              </Nav.Link>
            </Nav>

            {/* Search Bar */}
            <Form className="d-flex position-relative mt-2 mt-lg-0" onSubmit={handleSearch}>
              <InputGroup>
                <FormControl
                  type="search"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={handleInputChange}
                  style={{ minWidth: "200px" }}
                />
                <Button type="submit" variant="outline-secondary">
                  <FaSearch />
                </Button>
              </InputGroup>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div
                  className="position-absolute bg-white shadow w-100 mt-2 rounded z-3"
                  style={{ maxHeight: "200px", overflowY: "auto", top: "100%" }}
                >
                  {suggestions.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        navigate(`/product/${p.id}`);
                        setSearchQuery("");
                        setSuggestions([]);
                      }}
                      style={{ padding: "8px 10px", cursor: "pointer" }}
                      className="text-dark hover-bg-light"
                    >
                      {p.title}
                    </div>
                  ))}
                </div>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Category Dropdown */}
      {showCategories && (
        <div className="bg-light py-2 shadow-sm">
          <Container>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
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
