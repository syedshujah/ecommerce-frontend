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

    // basic validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all the fields!");
      return;
    }

    // show success alert
    setShowAlert(true);
    setFormData({ name: "", email: "", phone: "" });

    // hide alert after 3 sec
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="newsletter-wrapper" data-aos="fade-up">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h3 className="newsletter-heading">
              Get <span>20% OFF</span> on your first order!
            </h3>
            <p className="newsletter-subtext">Subscribe to our newsletter and stay updated with latest offers!</p>
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Subscribe Now
                </Button>
              </div>
            </Form>

            {showAlert && (
              <Alert variant="success" className="mt-3">
                Thank you for subscribing!
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Newsletter;
