import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Toast, ToastContainer } from "react-bootstrap";
import { saveMenuAxios } from "../../../services/menuService/menuCrudAxios";
import { LinkContainer } from "react-router-bootstrap";
import './AddMenu.css'; // Import the CSS for the theme
import { getMenuByResIdAxios } from "../../../services/menuService/menuCrudAxios";

export const AddMenu = () => {
  const [menu, setMenu] = useState({ Restaurant_Id: 0 });
  const [showToast, setShowToast] = useState(false);
  const [showToastTwo, setShowToastTwo] = useState(false);
  const p = useParams();
  const [token, setToken] = useState(localStorage.getItem("token_admin"));

  // Set axios header defaults
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const handleCloseToast = () => setShowToast(false);
  const handleCloseToastTwo = () => setShowToastTwo(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMenu();
  };

  async function saveMenu() {
    try {
      menu.Restaurant_Id = p.id;
      const res = await saveMenuAxios(menu);
      setShowToast(true);
      navigate(`add-meal/${res.data.id}`);
    } catch (err) {
      console.log("Error saving menu:", err);
      setShowToastTwo(true);
      getMenu(); // Call getMenu in case of error
    }
  }

  async function getMenu() {
    try {
      const res = await getMenuByResIdAxios(menu.Restaurant_Id);
      navigate(`view-meal/${res.data[0].id}`);
    } catch (err) {
      console.log("Error fetching menu:", err);
    }
  }

  const handleForm = (e) => {
    setMenu({
      ...menu,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="add-menu-container min-vh-100">
      <Container className="form-container">
        <Alert className="mb-4 text-center" variant="dark">
          <h2>Welcome to Menu</h2>
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button type="submit" className="submit-button">
                Create Menu
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
          <Toast.Body>Menu created successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
      <ToastContainer position="top-end">
        <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Problem creating menu. Please try again.</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};
