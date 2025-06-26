// src/components/FeaturedProducts.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import "./FeaturedProducts.css";
import { Link } from "react-router-dom";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=8");
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching featured products:", err);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <section className="featured-section"  data-aos="zoom-in">
      <h2 className="featured-title"> Featured Products</h2>
      <Container>
        <Row className="g-4">
          {products.map((product) => (
            <Col  key={product.id} lg={3} md={4} sm={6} data-aos="zoom-in">
              <div className="product-card">
                <span className="discount-badge">-{product.discountPercentage}%</span>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                  />
                </Link>
                <div className="product-content">
                  <h5 className="product-title">{product.title}</h5>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price}</p>
                  <div className="card-buttons">
                    <Button
                      variant="outline-primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                    <Link to={`/product/${product.id}`}>
                      <Button variant="primary">View</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturedProducts;

