import React from "react";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const navigate = useNavigate();

    const handleCheckout = () => {
        clearCart();
        navigate("/order-success");
    };
    const { cartItems, clearCart } = useCart();

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const delivery = subtotal > 0 ? 5 : 0;
    const total = subtotal + delivery;

    return (
        <Container className="my-5">
            <h3 className="mb-4 text-center text-primary fw-bold">Order Summary</h3>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <Row>
                    <Col md={8}>
                        {cartItems.map((item) => (
                            <Card key={item.id} className="mb-3">
                                <Card.Body className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="mb-0">{item.title}</h6>
                                        <small className="text-muted">
                                            {item.quantity} × ${item.price}
                                        </small>
                                    </div>
                                    <span className="fw-semibold">${item.quantity * item.price}</span>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                    <Col md={4}>
                        <Card className="p-3">
                            <h5>Summary</h5>
                            <hr />
                            <p>Subtotal: ${subtotal.toFixed(2)}</p>
                            <p>Delivery: ${delivery.toFixed(2)}</p>
                            <h6>Total: ${total.toFixed(2)}</h6>
                            <Button variant="success" className="mt-3 w-100" onClick={handleCheckout}>
                                Confirm & Place Order
                            </Button>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default Checkout;
