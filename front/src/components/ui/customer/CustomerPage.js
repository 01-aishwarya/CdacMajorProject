import { LinkContainer } from "react-router-bootstrap";
import { Nav, NavLink, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCustomerByIdAxios } from "../../../services/customerService/customerCrudAxios";
import { deleteOrderByCustAxios } from "../../../services/orderService/orderCrudAxios";
import axios from "axios";
import './CustomerPage.css'; // Import custom CSS file
import {Modal} from "react-bootstrap";

export function CustomerPage() {
    const [customer, setCustomer] = useState({
        Username: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
        Phone: '',
        Addr: '',
        City: '',
        Pincode: ''
    });
    const navigate = useNavigate();
    const p = useParams();
    const [token, setToken] = useState(localStorage.getItem("token_customer"));

    // Set default header in axios
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    useEffect(() => {
        getUser();
    }, []);

    async function deleteCartById() {
        try {
            const response = await deleteOrderByCustAxios(p.id);
            console.log(response.data);
            tokFun();
        } catch (err) {
            console.log(err);
        }
    }

    const delMealByCustId = () => {
        setShowModal(true);
    };

    const tokFun = () => {
        localStorage.removeItem("token_customer");
        localStorage.clear();
        navigate("/");
    };

    async function getUser() {
        try {
            const res = await getCustomerByIdAxios(p.id);
            setCustomer(res.data[0]);
        } catch (err) {
            console.log(err);
        }
    }

    const [showModal, setShowModal] = useState(false);

    const confirmDelete = async () => {
        await deleteCartById();
        setShowModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    return (
        <>
            <Container fluid className="customer-page-container">
                <Row>
                    <Col lg={3} className="customer-sidebar">
                        <Row className="mb-4">
                            <LinkContainer to={`/see-res-by-location/${customer.city}/${customer.id}`}>
                                <NavLink><Button className="b-button">See Located Restaurants</Button></NavLink>
                            </LinkContainer>
                        </Row>
                        <Row className="mb-4">
                            <Col lg={6}>
                                <Button className="b-button" onClick={delMealByCustId}>Log Out</Button>
                            </Col>
                        </Row>
                    </Col>
                  
                </Row>

                {/* Modal for logout confirmation */}
                <Modal show={showModal} onHide={cancelDelete}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Logout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to log out and delete all your orders?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelDelete}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmDelete}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}
