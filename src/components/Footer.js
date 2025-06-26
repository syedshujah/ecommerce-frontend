// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="py-5">
          {/* About Section */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">About Blue Mart</h5>
            <p className="footer-text">
              At <strong>Blue Mart</strong>, we provide a top-notch online shopping experience,
              offering quality products at affordable prices. We are committed to customer
              satisfaction and seamless service.
            </p>
            <a href="/" className="footer-btn">
              Visit Store →
            </a>
          </Col>

          {/* Important Links */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Important Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">All Products</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/checkout">Checkout</a></li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={4} className="mb-4">
            <h5 className="footer-title">Contact Us</h5>
            <p><FaMapMarkerAlt className="me-2" /> Lahore, Pakistan</p>
            <p><FaPhone className="me-2" /> +92 300 1234567</p>
            <p><FaEnvelope className="me-2" /> support@bluemart.pk</p>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <Row className="border-top pt-3 text-center">
          <Col md={12}>
            <div className="footer-bottom-links">
              <a href="/">Privacy Policy</a>
              <a href="/">Terms of Use</a>
              <a href="/">Sitemap</a>
            </div>
            <p className="mt-2">© {new Date().getFullYear()} Blue Mart. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

