import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  } = useCart();

  // Quantity decrease function
  const decreaseQuantity = (product) => {
    if (product.quantity > 1) {
      removeFromCart(product.id, true); // second param true means decrease only
    } else {
      removeFromCart(product.id); // remove completely if quantity is 1
    }
  };

  // Total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Container className="mt-4">
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
          Your Shopping Cart
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

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <Row className="g-4">
            {cartItems.map((item) => (
              <Col md={6} key={item.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body className="d-flex">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      className="me-3"
                    />
                    <div className="flex-grow-1">
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text className="mb-1">
                        Price: <strong>${item.price}</strong>
                      </Card.Text>
                      <Card.Text className="mb-2">
                        Quantity:
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="ms-2 me-1"
                          onClick={() => decreaseQuantity(item)}
                        >
                          −
                        </Button>
                        {item.quantity}
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          className="ms-1"
                          onClick={() => addToCart(item)}
                        >
                          +
                        </Button>
                      </Card.Text>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Total + Clear Cart */}
          <div className="mt-4 text-end">
            <h5>Total: ${totalPrice.toFixed(2)}</h5>
            <Button variant="outline-danger" onClick={clearCart} className="mt-2">
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;

