import React, { useState } from "react";
import "./Newsletter.css";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

function Newsletter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all the fields!");
      return;
    }

    setShowAlert(true);
    setFormData({ name: "", email: "", phone: "" });

    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div
      className="newsletter-wrapper newsletter-section py-5 px-3"
      id="contact-section"
      style={{
        background: "linear-gradient(to right, #eef2f3, #ffffff)",
        borderTop: "3px solid #007bff",
      }}
      data-aos="fade-up"
    >
      <Container>
        <h2 className="text-center fw-bold mb-4 featured-title section-heading text-primary">
          Contact Us
        </h2>
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h3 className="newsletter-heading fw-bold text-dark mb-3">
              🎁 Get <span className="text-primary">20% OFF</span> on your first order!
            </h3>
            <p className="text-muted">
              Subscribe to our newsletter and stay updated with the latest offers, discounts, and product updates!
            </p>
          
          </Col>

          <Col md={6}>
            <div className="p-4 rounded shadow-sm bg-white">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="py-2"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    className="rounded-pill px-4 py-2 shadow-sm fw-semibold"
                    style={{
                      background: "linear-gradient(90deg, #0056b3, #007bff)",
                      border: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.target.style.opacity = "1")}
                  >
                    🚀 Subscribe Now
                  </Button>
                </div>
              </Form>

              {showAlert && (
                <Alert variant="success" className="mt-3 text-center">
                  ✅ Thank you for subscribing!
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Newsletter;
