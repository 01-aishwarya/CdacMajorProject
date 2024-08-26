import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllResAxios, deleteResAxios } from "../../../services/restaurantService/restaurantCrusAxios";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-bootstrap";
import './GetAllRestaurantComponent.css'; // Import the updated CSS

export function GetAllRestaurantComponent() {
    const [rest, setRes] = useState([]);
    const [id, setId] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const [token, setToken] = useState(localStorage.getItem("token_admin"));
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    const navigate = useNavigate();

    useEffect(() => {
        fetchRestaurant();
    }, []);

    async function fetchRestaurant() {
        try {
            const response = await getAllResAxios();
            setRes(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteResById() {
        if (id !== null) {
            try {
                await deleteResAxios(id);
                setShowConfirm(false);
                fetchRestaurant();
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleDeleteClick = (restaurantId) => {
        setId(restaurantId);
        setShowConfirm(true);
    };

    const handleCloseConfirm = () => setShowConfirm(false);

    return (
        <Container className="customer-container">
            <Row className="g-4">
                <Col lg={3} className="sidebar">
                    <Row className="mb-4">
                        <LinkContainer to="/admin-page">
                            <NavLink>
                                <Button className="link-button">Go Back</Button>
                            </NavLink>
                        </LinkContainer>
                    </Row>
                    <Row className="mb-4">
                        <LinkContainer to="/add-restaurant">
                            <NavLink>
                                <Button className="link-button">Add Restaurant</Button>
                            </NavLink>
                        </LinkContainer>
                    </Row>
                </Col>

                <Col lg={9} className="content">
                    <Container className="mb-3">
                        <Table striped bordered hover className="customer-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Location</th>
                                    <th>Image</th>
                                    <th className="menu-column">Menu</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rest.map((an) => (
                                    <tr key={an.id}>
                                        <td>{an.id}</td>
                                        <td>{an.name}</td>
                                        <td>{an.description}</td>
                                        <td>{an.location}</td>
                                        <td><img src={an.restaurantImage} alt={an.name} className="restaurant-image" /></td>
                                        <td>
                                            <Button
                                                className="link-button"
                                                onClick={() => {
                                                    navigate(`add-menu/${an.id}`);
                                                }}
                                            >
                                                Go For Menu
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                className="edit-button"
                                                onClick={() => {
                                                    navigate(`update-restaurant/${an.id}`);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                className="delete-button"
                                                onClick={() => handleDeleteClick(an.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>

            {/* Confirmation Modal */}
            <Modal show={showConfirm} onHide={handleCloseConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this restaurant?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={deleteResById}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
