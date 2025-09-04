import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Table, Button } from "react-bootstrap";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Container className="mt-5">
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
          Your Cart
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
        <p>No items in cart.</p>
      ) : (
        <>
          <Table bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5 className="text-end">Total: <span className="text-success">${getTotal()}</span></h5>
        </>
      )}
    </Container>
  );
}

export default Cart;
