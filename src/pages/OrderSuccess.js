import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <Container className="text-center my-5">
      <h2 className="text-success fw-bold mb-3">🎉 Order Placed Successfully!</h2>
      <p className="text-muted">Thank you for shopping with <strong>Blue Mart</strong>.</p>
      <Link to="/products">
        <Button variant="primary" className="mt-3">Continue Shopping</Button>
      </Link>
    </Container>
  );
}

export default OrderSuccess;
