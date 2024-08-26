import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import './Login.css'; // Import custom CSS file for additional styling

export const Login = () => {
  const [customer, setCustomer] = useState({ Email: '', Password: '' });
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    chkCustomer();
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  async function chkCustomer() {
    try {
      const res = await axios.get(`https://localhost:7125/login/${customer.Email}/${customer.Password}`);
      localStorage.setItem(`token_${res.data.user.category}`, res.data.token);

      if (res.status === 200 && res.data.user.category === "customer") {
        navigate(`/customer-page/${res.data.user.id}`);
      } else if (res.status === 200 && res.data.user.category === "admin") {
        navigate("/admin-page");
      } else {
        setShowToast(true);
      }
    } catch (err) {
      setShowToast(true);
    }
  }

  const handleForm = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Container className="login-container">
        <Row className="justify-content-center mb-4">
          <Col lg={6}>
            <Alert className="text-center login-alert xyz" >
              <h2>Welcome To TastyTrails APP</h2>
            </Alert>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={6} className="login-box">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  onChange={handleForm}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  onChange={handleForm}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>

              <Button className="submit-button" type="submit">
                Log In
              </Button>
            </Form>
          </Col>

          <Col lg={5} className="d-flex flex-column align-items-center mt-4">
            <LinkContainer to="/sign-up">
              <Button className="link-button mb-2">Sign Up</Button>
            </LinkContainer>
            <LinkContainer to="/about-us">
              <Button className="link-button">About Us</Button>
            </LinkContainer>
          </Col>
        </Row>

        <ToastContainer position="top-end">
          <Toast bg="danger" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-white">Invalid email or password</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  );
};
