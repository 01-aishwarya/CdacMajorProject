import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { Toast, ToastContainer } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddMeal.css'; // Import the CSS for the theme

// Import the saveMealAxios method from your service
import { saveMealAxios } from '../../../services/mealService/mealCrudAxios';

export const AddMeal = () => {
  const [meal, setMealData] = useState({ MealName: '', Price: '', MealDescription: '', MealImage: '', Menu_Id: '' });
  const [validated, setValidated] = useState(false); // State for form validation
  const [showToast, setShowToast] = useState(false);
  const [showToastTwo, setShowToastTwo] = useState(false);
  const p = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token_admin");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const handleCloseToast = () => setShowToast(false);
  const handleCloseToastTwo = () => setShowToastTwo(false);

  const handleForm = (e) => {
    setMealData({
      ...meal,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const formErrors = {};
    if (!meal.MealName) formErrors.MealName = 'Meal name is required.';
    if (!meal.Price) formErrors.Price = 'Price is required.';
    if (!meal.MealDescription) formErrors.MealDescription = 'Meal description is required.';
    if (!meal.MealImage) formErrors.MealImage = 'Meal image name is required.';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setValidated(true);
      return;
    }

    try {
      meal.Menu_Id = p.id;
      const res = await saveMealAxios(meal); // Use the provided saveMealAxios method
      if (res.status === 201) {
        setShowToast(true);
        navigate(`/view-meal/${p.id}`);
      }
    } catch (err) {
      setShowToastTwo(true);
      console.log(err);
    }
  };

  return (
    <>
      <Container className="home-container min-vh-100">
        <Container className="form-container">
          <Alert className=" submit-button d-flex justify-content-center text-white mb-4" >
            <h1>Add Meal</h1>
          </Alert>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col lg={4}>
                <Form.Group className="mb-3" controlId="formMealName">
                  <Form.Label className="form-label">Meal Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="MealName"
                    onChange={handleForm}
                    placeholder="Enter meal name"
                    required
                    isInvalid={validated && !meal.MealName}
                  />
                  <Form.Control.Feedback type="invalid">
                    Meal name is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={4}>
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label className="form-label">Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="Price"
                    onChange={handleForm}
                    placeholder="Enter price"
                    required
                    isInvalid={validated && !meal.Price}
                  />
                  <Form.Control.Feedback type="invalid">
                    Price is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col lg={4}>
                <Form.Group className="mb-3" controlId="formMealDescription">
                  <Form.Label className="form-label">Meal Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="MealDescription"
                    onChange={handleForm}
                    placeholder="Enter meal description"
                    required
                    isInvalid={validated && !meal.MealDescription}
                  />
                  <Form.Control.Feedback type="invalid">
                    Meal description is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="formMealImage">
                  <Form.Label className="form-label">Meal Image Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="MealImage"
                    onChange={handleForm}
                    placeholder="Enter meal image name"
                    required
                    isInvalid={validated && !meal.MealImage}
                  />
                  <Form.Control.Feedback type="invalid">
                    Meal image name is required.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col className="d-flex justify-content-center">
                <Button variant="warning" type="submit" className="submit-button">
                  Add Meal
                </Button>
              </Col>
              <Col lg={6} className="d-flex justify-content-center">
                <LinkContainer to={`/view-meal/${p.id}`}>
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
            <Toast.Body className="text-white">Meal added successfully!</Toast.Body>
          </Toast>
        </ToastContainer>

        <ToastContainer position="top-end">
          <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
            <Toast.Header>
              <strong className="me-auto">Error</strong>
            </Toast.Header>
            <Toast.Body className="text-white">Failed to add meal. Please try again.</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </>
  );
};
