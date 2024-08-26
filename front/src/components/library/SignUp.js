import { Form, Button, Container, Row, Col, Alert, Toast, ToastContainer } from "react-bootstrap";
import { useState } from "react";
import { saveCustomerAxios } from "../../services/customerService/customerCrudAxios";
import { useNavigate } from "react-router-dom";
import './SignUp.css'; // Import custom CSS file for additional styling
import { LinkContainer } from "react-router-bootstrap";

export const SignUp = () => {
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
  const navigate = useNavigate();

  const handleCloseToast = () => setShowToast(false);
  const handleCloseToastTwo = () => setShowToastTwo(false);

  const handleForm = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!customer.Username) {
      newErrors.Username = 'Username is required';
    } else if (!/^[a-zA-Z]+$/.test(customer.Username)) {
      newErrors.Username = 'Username must contain only letters';
    } else if (customer.Username.length < 4) {
      newErrors.Username = 'Username must be at least 4 characters long';
    }

    if (!customer.Email) {
      newErrors.Email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.Email)) {
      newErrors.Email = 'Invalid email format';
    }

    if (!customer.Password) {
      newErrors.Password = 'Password is required';
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(customer.Password)) {
      newErrors.Password = 'Password must be at least 6 characters long, contain at least one letter, one number, and one special character';
    }

    if (customer.Password !== customer.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Passwords do not match';
    }

    if (!customer.Phone) {
      newErrors.Phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(customer.Phone)) {
      newErrors.Phone = 'Phone number must be 10 digits';
    }

    if (!customer.Category) {
      newErrors.Category = 'Category is required';
    }

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
        navigate("/log-in");
      }
    } catch (err) {
      setShowToastTwo(true);
      console.log(err);
    }
  };

  return (
    <Container className="signup-container">
      <Alert className="text-center signup-header signup-button"  >
        <h1>Sign Up</h1>
      </Alert>

      <Row className="justify-content-center">
        <Col lg={8} className="signup-form-container">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    value={customer.Username}
                    onChange={handleForm}
                    placeholder="Enter Username"
                    className={`form-control ${errors.Username ? 'is-invalid' : ''}`}
                  />
                  {errors.Username && <Form.Text className="text-danger">{errors.Username}</Form.Text>}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={customer.Email}
                    onChange={handleForm}
                    placeholder="Enter Email"
                    className={`form-control ${errors.Email ? 'is-invalid' : ''}`}
                  />
                  {errors.Email && <Form.Text className="text-danger">{errors.Email}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    value={customer.Password}
                    onChange={handleForm}
                    placeholder="Enter password"
                    className={`form-control ${errors.Password ? 'is-invalid' : ''}`}
                  />
                  {errors.Password && <Form.Text className="text-danger">{errors.Password}</Form.Text>}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="ConfirmPassword"
                    value={customer.ConfirmPassword}
                    onChange={handleForm}
                    placeholder="Confirm password"
                    className={`form-control ${errors.ConfirmPassword ? 'is-invalid' : ''}`}
                  />
                  {errors.ConfirmPassword && <Form.Text className="text-danger">{errors.ConfirmPassword}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="Phone"
                    value={customer.Phone}
                    onChange={handleForm}
                    placeholder="Enter phone"
                    className={`form-control ${errors.Phone ? 'is-invalid' : ''}`}
                  />
                  {errors.Phone && <Form.Text className="text-danger">{errors.Phone}</Form.Text>}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Check
                    type="radio"
                    name="Category"
                    value="customer"
                    onChange={handleForm}
                    label="Customer"
                    className={`form-check-input ${errors.Category ? 'is-invalid' : ''}`}
                  />
                  <Form.Check
                    type="radio"
                    name="Category"
                    value="admin"
                    onChange={handleForm}
                    disabled
                    label="Admin"
                    className={`form-check-input ${errors.Category ? 'is-invalid' : ''}`}
                  />
                  {errors.Category && <Form.Text className="text-danger">{errors.Category}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicAddr">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="Addr"
                    value={customer.Addr}
                    onChange={handleForm}
                    placeholder="Enter address"
                    className={`form-control ${errors.Addr ? 'is-invalid' : ''}`}
                  />
                  {errors.Addr && <Form.Text className="text-danger">{errors.Addr}</Form.Text>}
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="City"
                    value={customer.City}
                    onChange={handleForm}
                    placeholder="Enter city"
                    className={`form-control ${errors.City ? 'is-invalid' : ''}`}
                  />
                  {errors.City && <Form.Text className="text-danger">{errors.City}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formBasicPincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    name="Pincode"
                    value={customer.Pincode}
                    onChange={handleForm}
                    placeholder="Enter pincode"
                    className={`form-control ${errors.Pincode ? 'is-invalid' : ''}`}
                  />
                  {errors.Pincode && <Form.Text className="text-danger">{errors.Pincode}</Form.Text>}
                </Form.Group>
              </Col>
            </Row>

            <Col className="d-flex justify-content-center">
              <Button className="signup-button" type="submit">
                Sign Up
              </Button>
            </Col>
          </Form>
        </Col>

        <Col lg={3} className="text-center">
          <LinkContainer to="/log-in">
            <Button className="login-button">Log In</Button>
          </LinkContainer>
        </Col>
      </Row>

      <ToastContainer position="top-end">
        <Toast className="toast-success" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Customer registered</Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer position="top-end">
        <Toast className="toast-error" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Customer NOT registered</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};
