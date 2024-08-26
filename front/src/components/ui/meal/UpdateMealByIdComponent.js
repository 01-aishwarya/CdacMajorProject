import { Form, Button, Container, Row, Col, Alert, Toast, ToastContainer } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { getMealByMealIdAxios, updateMealAxios } from "../../../services/mealService/mealCrudAxios";

export const UpdateMealByIdComponent = () => {
  const [meal, setMeal] = useState({ MealName: '', Price: '', MealDescription: '', MealImage: '', Menu_Id: '' });
  const [showToast, setShowToast] = useState(false);
  const [showToastTwo, setShowToastTwo] = useState(false);
  const p = useParams();
  const [token, setToken] = useState(localStorage.getItem("token_admin"));

  // Set default headers for axios
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    getMeal();
  }, []);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleCloseToastTwo = () => {
    setShowToastTwo(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateMealAxios(meal);
      console.log(res);
      setShowToast(true);
    } catch (err) {
      console.log(err);
      setShowToastTwo(true);
    }
  };

  async function getMeal() {
    try {
      const res = await getMealByMealIdAxios(p.id);
      setMeal(res.data[0] || {});
    } catch (err) {
      console.log(err);
    }
  }

  const handleForm = (e) => {
    setMeal({
      ...meal,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="home-container">
      <Container className="form-container">
        <Alert className="mt-5 d-flex justify-content-center text-white" style={{ backgroundColor: "#0a9396" }}>
          <h2>Update Meal</h2>
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Meal Name</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="MealName"
                  value={meal.MealName}
                  onChange={handleForm}
                  placeholder={meal.mealName}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Price</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="Price"
                  value={meal.Price}
                  onChange={handleForm}
                  placeholder={meal.price}
                />
              </Form.Group>
            </Col>
            <Col lg={4}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Meal Description</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="MealDescription"
                  value={meal.MealDescription}
                  onChange={handleForm}
                  placeholder={meal.mealDescription}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Meal Image</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="MealImage"
                  value={meal.MealImage}
                  onChange={handleForm}
                  placeholder={meal.mealImage}
                />
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Menu ID</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  name="Menu_Id"
                  value={meal.Menu_Id}
                  onChange={handleForm}
                  placeholder={meal.menu_Id}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button className="submit-button" type="submit">Update Meal</Button>
            </Col>
            <Col className="d-flex justify-content-center">
              <LinkContainer to={`/view-meal/${meal.menu_Id}`}>
                <Button className="link-button">Go Back</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Form>
      </Container>

      <ToastContainer position="top-end">
        <Toast bg="success" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Confirmation</strong>
          </Toast.Header>
          <Toast.Body>Meal updated successfully</Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer position="top-end">
        <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Problem updating meal</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};
