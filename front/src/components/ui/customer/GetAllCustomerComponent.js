import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-bootstrap";
import { getAllCustomerAxios, deleteCustomerAxios } from "../../../services/customerService/customerCrudAxios";
import './GetAllCustomerComponent.css'; // Import custom CSS file for additional styling

export function GetAllCustomerComponent() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Set token from session storage
    const [token, setToken] = useState(localStorage.getItem("token_admin"));
    // To set default header in axios
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    async function fetchCustomers() {
        try {
            const response = await getAllCustomerAxios();
            setCustomers(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteCustomerById(customerId) {
        try {
            await deleteCustomerAxios(customerId);
            fetchCustomers(); // Refresh customer list after deletion
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = (customerId) => {
        setSelectedCustomerId(customerId);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (selectedCustomerId) {
            await deleteCustomerById(selectedCustomerId);
            setShowModal(false);
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    return (
        <Container fluid className="customer-container">
            <Row className="g-4"> {/* Added gap between columns */}
                <Col lg={3} className="sidebar">
                    <Row className="mb-4">
                        <LinkContainer to="/admin-page">
                            <NavLink><Button className="link-button">Go Back</Button></NavLink>
                        </LinkContainer>
                    </Row>
                    <Row className="mb-4">
                        <LinkContainer to="/add-customer">
                            <NavLink><Button className="link-button">Add Customer</Button></NavLink>
                        </LinkContainer>
                    </Row>
                </Col>
                <Col lg={9} className="content">
                    <Container className="mb-3">
                        <Table striped bordered hover className="customer-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Confirm Password</th>
                                    <th>Phone</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>Pincode</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.username}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.password}</td>
                                        <td>{customer.confirmPassword}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.addr}</td>
                                        <td>{customer.city}</td>
                                        <td>{customer.pincode}</td>
                                        <td>
                                            <Button className="edit-button" onClick={() => navigate(`edit-customer/${customer.id}`)}>Edit</Button>
                                        </td>
                                        <td>
                                            <Button className="delete-button" onClick={() => handleDelete(customer.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>

            {/* Modal for delete confirmation */}
            <Modal show={showModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this customer?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
