import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-bootstrap";
import { getMealByIdAxios, deleteMealAxios } from "../../../services/mealService/mealCrudAxios";
import './GetAllMealComponent.css'; // Import the CSS for the theme

export function GetAllMealComponent() {
    const [meal, setMeal] = useState([]);
    const [mealId, setMealId] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const navigate = useNavigate();
    const p = useParams();

    const [token, setToken] = useState(localStorage.getItem("token_admin"));
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    useEffect(() => {
        fetchMeal();
    }, []);

    async function fetchMeal() {
        try {
            const response = await getMealByIdAxios(p.id);
            setMeal(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteMeal() {
        try {
            await deleteMealAxios(mealId);
            fetchMeal();
            handleCloseDeleteModal(); // Close modal after deletion
        } catch (err) {
            console.log(err);
        }
    }

    const handleShowDeleteModal = (id) => {
        setMealId(id);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setMealId(0);
    };

    return (
        <Container className="customer-container">
            <Row className="g-4">
                <Col lg={3} className="sidebar">
                    <Row className="mb-3">
                        <LinkContainer to="/admin-page">
                            <NavLink><Button className="link-button">Go Back</Button></NavLink>
                        </LinkContainer>
                    </Row>
                    <Row>
                        <LinkContainer to={`/add-meal/${p.id}`}>
                            <NavLink><Button className="link-button">Add Meal</Button></NavLink>
                        </LinkContainer>
                    </Row>
                </Col>

                <Col lg={9} className="content">
                    <Row className="g-4">
                        {meal.map((an) => (
                            <Col lg={4} md={6} key={an.id}>
                                <Card className="meal-card">
                                    <Card.Img variant="top" src={an.mealImage} className="meal-image" />
                                    <Card.Body>
                                        <Card.Title>{an.mealName}</Card.Title>
                                        <Card.Text>
                                            <strong>Price:</strong> ${an.price}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Description:</strong> {an.mealDescription}
                                        </Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <LinkContainer to={`/update-meal/${an.id}`}>
                                                <NavLink><Button className="edit-button">Edit</Button></NavLink>
                                            </LinkContainer>
                                            <Button className="delete-button" onClick={() => handleShowDeleteModal(an.id)}>Delete</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this meal?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteMeal}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
