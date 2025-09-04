import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { showAddToCartToast } from "../utils/useToast";
import "./ProductCard.css"; // 👈 custom css

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    showAddToCartToast(product);
  };

  // ✅ Discounted price calculate
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <Card
      className="product-card shadow-sm border-0 h-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ✅ Image Section */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="product-img-wrapper">
          <img
            src={hovered && product.images[1] ? product.images[1] : product.thumbnail}
            alt={product.title}
            className="product-img"
          />
          {product.discountPercentage > 0 && (
            <span className="discount-badge">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>


        {/* ✅ Product Info */}
        <Card.Body className="px-3 py-2 text-center">
          <Card.Title className="fs-6 fw-semibold text-dark mb-1">
            {product.title}
          </Card.Title>
          <Card.Text className="text-muted small">
            {product.description.slice(0, 50)}...
          </Card.Text>
        </Card.Body>
      </Link>

      {/* ✅ Price & Add to Cart */}
      <div className="d-flex justify-content-between align-items-center px-3 pb-3">
        {product.discountPercentage > 0 ? (
          <div className="price-section">
            <span className="original-price">${product.price}</span>
            <span className="discounted-price">${discountedPrice}</span>
          </div>
        ) : (
          <span className="normal-price">${product.price}</span>
        )}
        <Button size="sm" variant="outline-primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
