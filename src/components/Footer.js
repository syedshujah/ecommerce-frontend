import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section">
      <Container>
        <Row className="footer-top">
          <Col md={4} sm={12}>
            <h5 className="footer-title">About Blue Mart</h5>
            <p>
              Blue Mart is your one-stop online shop for all your daily essentials. We provide top quality products at unbeatable prices with reliable delivery.
            </p>
          </Col>

          <Col md={4} sm={6}>
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/checkout">Checkout</a></li>
            </ul>
          </Col>

          <Col md={4} sm={6}>
            <h5 className="footer-title">Customer Care</h5>
            <ul className="footer-links">
              <li>Phone: +92 300 1234567</li>
              <li>Email: support@bluemart.pk</li>
              <li>Location: Lahore, Pakistan</li>
              <li>Mon - Sat: 9:00 AM - 7:00 PM</li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row className="footer-bottom">
          <Col className="text-center">
            <p className="mb-0">© {new Date().getFullYear()} Blue Mart. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
