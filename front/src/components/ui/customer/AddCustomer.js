import { useState } from 'react';
import { Button, Col, Form, Row, Toast, ToastContainer, Container, Alert } from 'react-bootstrap';
import { saveCustomerAxios } from '../../../services/customerService/customerCrudAxios';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCustomer.css'; // Import the updated CSS

export const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    Username: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Phone: '',
    Category: '',
    Addr: '',
    City: '',
    Pincode: ''
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showToastTwo, setShowToastTwo] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token_admin"));

  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const navigate = useNavigate();

  const handleCloseToast = () => setShowToast(false);
  const handleCloseToastTwo = () => setShowToastTwo(false);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    // Username validation
    if (!customer.Username) {
      newErrors.Username = 'Username is required';
    } else if (!/^[a-zA-Z]+$/.test(customer.Username)) {
      newErrors.Username = 'Username must contain only letters';
    } else if (customer.Username.length < 4) {
      newErrors.Username = 'Username must be at least 4 characters long';
    }

    // Email validation
    if (!customer.Email) {
      newErrors.Email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.Email)) {
      newErrors.Email = 'Invalid email format';
    }

    // Password validation
    if (!customer.Password) {
      newErrors.Password = 'Password is required';
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(customer.Password)) {
      newErrors.Password = 'Password must be at least 6 characters long, contain at least one letter, one number, and one special character';
    }

    // Confirm Password validation
    if (customer.Password !== customer.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Passwords do not match';
    }

    // Phone validation
    if (!customer.Phone) {
      newErrors.Phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customer.Phone)) {
      newErrors.Phone = 'Phone number must be 10 digits';
    }

    // Category validation
    if (!customer.Category) {
      newErrors.Category = 'Category is required';
    }

    // Address validation
    if (!customer.Addr) {
      newErrors.Addr = 'Address is required';
    }
    if (!customer.City) {
      newErrors.City = 'City is required';
    }
    if (!customer.Pincode) {
      newErrors.Pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(customer.Pincode)) {
      newErrors.Pincode = 'Pincode must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await saveCustomerAxios(customer);
      if (res.status === 201) {
        setShowToast(true);
        setCustomer({
          Username: '',
          Email: '',
          Password: '',
          ConfirmPassword: '',
          Phone: '',
          Category: '',
          Addr: '',
          City: '',
          Pincode: ''
        });
      }
    } catch (err) {
      setShowToastTwo(true);
      console.log(err);
    }
  };

  return (
    <Container className="home-container min-vh-100">
      <Container className="d-flex justify-content-center align-items-center">
        <div className="login-box">
          <Alert className="text-center mb-4 submit-button" >
            <h1>Add Customer</h1>
          </Alert>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    value={customer.Username}
                    onChange={handleForm}
                    placeholder="Enter Username"
                    isInvalid={!!errors.Username}
                  />
                  <Form.Control.Feedback type="invalid">{errors.Username}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={customer.Email}
                    onChange={handleForm}
                    placeholder="Enter Email"
                    isInvalid={!!errors.Email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    value={customer.Password}
                    onChange={handleForm}
                    placeholder="Enter Password"
                    isInvalid={!!errors.Password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="ConfirmPassword"
                    value={customer.ConfirmPassword}
                    onChange={handleForm}
                    placeholder="Confirm Password"
                    isInvalid={!!errors.ConfirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">{errors.ConfirmPassword}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formBasicPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="Phone"
                    value={customer.Phone}
                    onChange={handleForm}
                    placeholder="Enter Phone Number"
                    isInvalid={!!errors.Phone}
                  />
                  <Form.Control.Feedback type="invalid">{errors.Phone}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formBasicCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Check
                    type="radio"
                    name="Category"
                    value="customer"
                    onChange={handleForm}
                    label="Customer"
                    inline
                    isInvalid={!!errors.Category}
                  />
                  <Form.Check
                    type="radio"
                    name="Category"
                    value="admin"
                    onChange={handleForm}
                    label="Admin"
                    inline
                    disabled
                  />
                  <Form.Control.Feedback type="invalid">{errors.Category}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formBasicAddr">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="Addr"
                    value={customer.Addr}
                    onChange={handleForm}
                    placeholder="Enter Address"
                    isInvalid={!!errors.Addr}
                  />
                  <Form.Control.Feedback type="invalid">{errors.Addr}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formBasicCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="City"
                    value={customer.City}
                    onChange={handleForm}
                    placeholder="Enter City"
                    isInvalid={!!errors.City}
                  />
                  <Form.Control.Feedback type="invalid">{errors.City}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6} className="mb-3">
                <Form.Group controlId="formBasicPincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    name="Pincode"
                    value={customer.Pincode}
                    onChange={handleForm}
                    placeholder="Enter Pincode"
                    isInvalid={!!errors.Pincode}
                  />
                  <Form.Control.Feedback type="invalid">{errors.Pincode}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={12} className="d-flex justify-content-between mb-3">
                <Button className="submit-button" type="submit">
                  Add Customer
                </Button>
                <LinkContainer to="/see-all-customers">
                  <Button className="link-button">Go Back</Button>
                </LinkContainer>
              </Col>
            </Row>
          </Form>

          <ToastContainer position="top-end">
            <Toast bg="success" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">Confirmation</strong>
              </Toast.Header>
              <Toast.Body className="text-white">Customer registered</Toast.Body>
            </Toast>
          </ToastContainer>

          <ToastContainer position="top-end">
            <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">Error</strong>
              </Toast.Header>
              <Toast.Body className="text-white">Customer NOT registered</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      </Container>
    </Container>
  );
};
