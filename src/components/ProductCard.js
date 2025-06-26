import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Card
      className="product-card h-100"
      style={{
        minHeight: "320px",
        maxHeight: "350px",
        overflow: "hidden",
        boxShadow: "0 0 10px rgba(0,0,255,0.1)",
      }}
    >
      {/* Image and title click -> goes to product detail */}
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Card.Img
        className="img-fluid product-img"
          variant="top"
          src={product.thumbnail}
          style={{
            height: "160px",
            objectFit: "cover",
          }}
        />
        <Card.Body className="d-flex flex-column p-2">
          <Card.Title className="fs-6 mb-1">{product.title}</Card.Title>
          <Card.Text
            className="text-muted"
            style={{
              fontSize: "13px",
              flexGrow: 1,
              marginBottom: "6px",
            }}
          >
            {product.description.slice(0, 50)}...
          </Card.Text>
        </Card.Body>
      </Link>

      {/* Add to Cart button stays outside of Link */}
      <div className="d-flex justify-content-between align-items-center px-3 pb-3">
        <span className="fw-bold text-primary">${product.price}</span>
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
