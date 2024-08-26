import { Form, Button, Container, Row, Col, Alert, Toast, ToastContainer } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getResByIdAxios, updateResAxios } from "../../../services/restaurantService/restaurantCrusAxios";
import { LinkContainer } from "react-router-bootstrap";
import "./UpdateRes.css";


export const UpdateRestaurantByIdComponent = () => {
  const [restaurant, setRestaurant] = useState({ Name: '', Description: '', Location: '', RestaurantImage: '' });
  const [showToast, setShowToast] = useState(false);
  const [showToastTwo, setShowToastTwo] = useState(false);
  const p = useParams();
  const [token, setToken] = useState(localStorage.getItem("token_admin"));

  // Set default headers for axios
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    getRes();
  }, []);

  const handleCloseToast = () => setShowToast(false);
  const handleCloseToastTwo = () => setShowToastTwo(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateResAxios(restaurant);
      console.log(res);
      setShowToast(true);
    } catch (err) {
      console.log(err);
      setShowToastTwo(true);
    }
  };

  async function getRes() {
    try {
      const res = await getResByIdAxios(p.id);
      setRestaurant(res.data[0] || {});
    } catch (err) {
      console.log(err);
    }
  }

  const handleForm = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="home-container mt-5" style={{ maxWidth: "900px", borderRadius: "20px", padding: "2rem" }}>
      <Container className="mb-4" style={{ backgroundColor: "#0a9396", borderRadius: "10px", padding: "1rem" }}>
        <Alert className="text-center text-white mb-0">
          <h2>Update Restaurant</h2>
        </Alert>
      </Container>

      <Container style={{ backgroundColor: "#e0f7fa", padding: "2rem", borderRadius: "10px" }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Name</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="Name"
                  value={restaurant.Name}
                  onChange={handleForm}
                  placeholder={restaurant.name}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Description</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="Description"
                  value={restaurant.Description}
                  onChange={handleForm}
                  placeholder={restaurant.description}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Location</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="Location"
                  value={restaurant.Location}
                  onChange={handleForm}
                  placeholder={restaurant.location}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Restaurant Image</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="RestaurantImage"
                  value={restaurant.RestaurantImage}
                  onChange={handleForm}
                  placeholder={restaurant.restaurantImage}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button className="submit-button" type="submit">
                Update Restaurant
              </Button>
            </Col>
            <Col className="d-flex justify-content-center">
              <LinkContainer to="/see-all-restaurants">
                <Button className="link-button">Go Back</Button>
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
          <Toast.Body>Restaurant updated successfully</Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer position="top-end">
        <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Problem updating restaurant</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};
