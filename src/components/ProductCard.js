import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { showAddToCartToast } from "../utils/useToast";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    showAddToCartToast(product); // ✅ Show popup with counter
  };

  return (
    <Card
      className="product-card h-100 shadow-sm border-0"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      {/* ✅ Image Section */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            height: "200px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8f9fa",
            padding: "10px",
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* ✅ Product Info */}
        <Card.Body className="px-3 py-2">
          <Card.Title className="fs-6 fw-semibold text-dark mb-1">
            {product.title}
          </Card.Title>
          <Card.Text
            className="text-muted"
            style={{ fontSize: "13px", minHeight: "36px" }}
          >
            {product.description.slice(0, 50)}...
          </Card.Text>
        </Card.Body>
      </Link>

      {/* ✅ Price & Add to Cart */}
      <div className="d-flex justify-content-between align-items-center px-3 pb-3">
        <span className="fw-bold text-primary">${product.price}</span>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={handleAddToCart} // ✅ FIXED HERE
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
