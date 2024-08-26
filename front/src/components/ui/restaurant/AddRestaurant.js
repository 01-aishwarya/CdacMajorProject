import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Toast, ToastContainer, Container, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddRestaurant.css'; // Import the CSS for the theme
import { saveResAxios } from '../../../services/restaurantService/restaurantCrusAxios';

export const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState({ Name: '', Description: '', Location: '', RestaurantImage: '' });
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToastTwo, setShowToastTwo] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token_admin"));
  
  // Set axios header defaults
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  
  const navigate = useNavigate();
  
  const handleCloseToast = () => setShowToast(false);
  const handleCloseToastTwo = () => setShowToastTwo(false);
  
  const handleForm = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value
    });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const res = await saveResAxios(restaurant);
        if (res.status === 201) {
          setShowToast(true);
          navigate("/see-all-restaurants");
        }
      } catch (err) {
        setShowToastTwo(true);
        console.log(err);
      }
    }
    setValidated(true);
  }

  return (
    <>
      <Container className="home-container min-vh-100">
        <Container className="login-box">
          <Alert className="mb-4 text-center text-white" style={{ backgroundColor: "#0a9396" }}>
            <h1>Add Restaurant</h1>
          </Alert>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col lg={4}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="form-label">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name"
                    placeholder="Restaurant Name"
                    onChange={handleForm}
                    required
                    isInvalid={validated && !restaurant.Name}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a restaurant name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label className="form-label">Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="Description"
                    placeholder="Restaurant Description"
                    onChange={handleForm}
                    required
                    isInvalid={validated && !restaurant.Description}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a description.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label className="form-label">Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="Location"
                    placeholder="Restaurant Location"
                    onChange={handleForm}
                    required
                    isInvalid={validated && !restaurant.Location}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a location.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formImage">
                  <Form.Label className="form-label">Restaurant Image Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="RestaurantImage"
                    placeholder="Image Name (e.g., restaurant1.jpg)"
                    onChange={handleForm}
                    required
                    isInvalid={validated && !restaurant.RestaurantImage}
                    className="form-control"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide an image name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button variant="warning" type="submit" className="submit-button">
                  Add Restaurant
                </Button>
              </Col>
              <Col lg={6} className="d-flex justify-content-center">
                <LinkContainer to="/see-all-restaurants">
                  <Button className="link-button">
                    Go Back
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
          </Form>
        </Container>

        <ToastContainer position="top-end">
          <Toast bg="success" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Success</strong>
            </Toast.Header>
            <Toast.Body className="text-white">Restaurant successfully added!</Toast.Body>
          </Toast>
        </ToastContainer>

        <ToastContainer position="top-end">
          <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-white">Failed to add restaurant. Please try again.</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  );
}
