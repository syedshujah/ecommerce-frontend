import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Card
      className="product-card h-100 shadow-sm border-0"
      style={{
        borderRadius: "1rem",
        overflow: "hidden",
        transition: "transform 0.3s ease",
      }}
    >
      {/* ✅ Image with link to detail */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            height: "180px",
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <Card.Img
            src={product.thumbnail}
            alt={product.title}
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out",
            }}
            className="product-img"
          />
        </div>

        <Card.Body className="px-3 py-2">
          <Card.Title className="fs-6 fw-semibold mb-1">{product.title}</Card.Title>
          <Card.Text
            className="text-muted mb-2"
            style={{ fontSize: "0.9rem", lineHeight: "1.3rem" }}
          >
            {product.description.length > 60
              ? `${product.description.slice(0, 60)}...`
              : product.description}
          </Card.Text>
        </Card.Body>
      </Link>

      {/* ✅ Price + Cart Button */}
      <div className="d-flex justify-content-between align-items-center px-3 pb-3">
        <span className="fw-bold text-primary">${product.price.toFixed(2)}</span>
        <Button
          size="sm"
          variant="outline-primary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

export default ProductCard;
