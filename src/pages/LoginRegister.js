import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginRegister() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setError("");
    setForm({ name: "", email: "", password: "" });
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!email || !password || (!isLogin && !name)) {
      return setError("Please fill all required fields.");
    }

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === email && storedUser.password === password) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      const newUser = { name, email, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow p-4">
        <h3 className="text-center mb-3 fw-bold text-primary">
          {isLogin ? "Login to Blue Mart" : "Create an Account"}
        </h3>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            {isLogin ? "Login" : "Register"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <span>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>{" "}
          <Button variant="link" onClick={toggleForm}>
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default LoginRegister;
