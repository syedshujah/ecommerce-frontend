import React from "react";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaTag, FaShoppingBasket } from "react-icons/fa";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const handleCheckout = () => {
    clearCart();
    navigate("/order-success");
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const delivery = subtotal > 0 ? 5 : 0;
  const total = subtotal + delivery;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="mb-5 text-center">
            <h2 
              className="fw-bold mb-3"
              style={{
                fontSize: '2.2rem',
                color: '#2c3e50',
                fontFamily: "'Poppins', sans-serif",
                position: 'relative',
                display: 'inline-block',
                paddingBottom: '10px'
              }}
            >
              🧾 Checkout Summary
            </h2>
            <div 
              style={{
                height: '2px',
                width: '80px',
                background: '#2c3e50',
                margin: '12px auto 0',
                borderRadius: '2px',
                opacity: '0.7'
              }}
            />
          </div>
          <Row>
            {/* Cart Items */}
            <Col md={7}>
              {cartItems.length === 0 ? (
                <Card className="p-4 text-center shadow-sm border-0">
                  <h5>Your cart is empty.</h5>
                </Card>
              ) : (
                cartItems.map((item) => (
                  <Card key={item.id} className="mb-3 border-0 shadow-sm rounded-4 p-3">
                    <div className="d-flex align-items-center gap-3">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "10px" }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1 fw-semibold">{item.title}</h6>
                        <small className="text-muted">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </small>
                      </div>
                      <span className="fw-bold text-success fs-6">
                        ${item.quantity * item.price}
                      </span>
                    </div>
                  </Card>
                ))
              )}
            </Col>

            {/* Summary */}
            <Col md={5}>
              <Card className="shadow-lg p-4 border-0 rounded-4">
                <h5 className="mb-4 fw-bold text-dark">Summary</h5>

                <div className="d-flex justify-content-between mb-2">
                  <span><FaShoppingBasket className="me-2 text-secondary" /> Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span><FaTruck className="me-2 text-secondary" /> Delivery</span>
                  <span>${delivery.toFixed(2)}</span>
                </div>

                <div className="d-flex justify-content-between mb-3 border-top pt-3">
                  <strong><FaTag className="me-2 text-success" /> Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>

                <Button variant="primary" className="w-100 fw-bold py-2 mt-2" onClick={handleCheckout}>
                  Confirm & Place Order
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
