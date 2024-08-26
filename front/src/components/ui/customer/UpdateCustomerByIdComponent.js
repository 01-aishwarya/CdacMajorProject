import { Form, Button, Container, Row, Col, Alert, Toast, ToastContainer } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getCustomerByIdAxios, updateCustomerAxios } from "../../../services/customerService/customerCrudAxios";
import { LinkContainer } from "react-router-bootstrap";
import './UpdateCustomerByIdComponent.css'; // Import the CSS file

export const UpdateCustomerByIdComponent = () => {
  const [customer, setCustomer] = useState({
    Username: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Phone: '',
    Addr: '',
    City: '',
    Pincode: ''
  });

  const [showToast, setShowToast] = useState(false);
  const [showToastTwo, setShowToastTwo] = useState(false);
  const p = useParams();
  const [token, setToken] = useState(localStorage.getItem("token_admin"));

  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    getUser();
  }, []);

  const handleCloseToast = () => setShowToast(false);
  const handleCloseToastTwo = () => setShowToastTwo(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomerAxios(customer);
      setShowToast(true);
    } catch (err) {
      console.log(err);
      setShowToastTwo(true);
    }
  };

  async function getUser() {
    try {
      const res = await getCustomerByIdAxios(p.id);
      setCustomer(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleForm = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="home-container min-vh-100">
      <Container className="login-box">
        <Alert className="text-center mb-4" variant="dark">
          <h2>Update Customer</h2>
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col lg={4}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  onChange={handleForm}
                  value={customer.Email}
                  placeholder={customer.email}
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  onChange={handleForm}
                  value={customer.Username}
                 placeholder={customer.username}
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  onChange={handleForm}
                  value={customer.Password}
                 placeholder={customer.password}
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label className="form-label">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="ConfirmPassword"
                  onChange={handleForm}
                  value={customer.ConfirmPassword}
                  placeholder={customer.confirmPassword}
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="formBasicPhone">
                <Form.Label className="form-label">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="Phone"
                  onChange={handleForm}
                  value={customer.Phone}
                  placeholder={customer.phone}
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <Form.Group controlId="formBasicAddr">
                <Form.Label className="form-label">Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="Addr"
                  onChange={handleForm}
                  value={customer.Addr}
                  placeholder={customer.addr}
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group controlId="formBasicCity">
                <Form.Label className="form-label">City</Form.Label>
                <Form.Control
                  type="text"
                  name="City"
                  onChange={handleForm}
                  value={customer.City}
                  placeholder={customer.city}
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6}>
              <Form.Group controlId="formBasicPincode">
                <Form.Label className="form-label">Pincode</Form.Label>
                <Form.Control
                  type="text"
                  name="Pincode"
                  onChange={handleForm}
                  value={customer.Pincode}
                  placeholder={customer.pincode}
                  className="form-control"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={6} className="d-flex justify-content-center">
              <Button type="submit" className="submit-button">Update Customer</Button>
            </Col>
            <Col lg={6} className="d-flex justify-content-center">
              <LinkContainer to="/see-all-customers">
                <Button className="link-button">Go Back</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Form>
      </Container>

      <ToastContainer position="top-end">
        <Toast bg="warning" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Customer updated successfully.</Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer position="top-end">
        <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Failed to update customer.</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};
