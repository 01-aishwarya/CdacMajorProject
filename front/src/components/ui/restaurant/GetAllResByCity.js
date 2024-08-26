import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getAllResByCityAxios, deleteResAxios } from "../../../services/restaurantService/restaurantCrusAxios";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-bootstrap";
import './GetAllResByCity.css'; // Import custom CSS file for additional styling

export function GetAllResByCity() {
    const [rest, setRes] = useState([]);
    const [id, setId] = useState(0);
    const navigate = useNavigate();
    const p = useParams();
    const [token, setToken] = useState(localStorage.getItem("token_customer"));

    // Set default header in axios
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    useEffect(() => {
        fetchRestaurant();
    }, []);

    async function fetchRestaurant() {
        try {
            const response = await getAllResByCityAxios(p.city);
            setRes(response.data);
        } catch (err) {
            console.log(err);
        }
    }

   

    return (
        <Container className="res-by-city-container">
            <Row>
                <Col lg={3} className="sidebar">
                    <Row className="mb-4">
                        <LinkContainer to={`/customer-page/${p.id}`}>
                            <NavLink><Button className="b-button">Go Back</Button></NavLink>
                        </LinkContainer>
                    </Row>
                </Col>

                <Col lg={9} className="content">
                    <Container className="table-container">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Location</th>
                                    <th>Restaurant Image</th>
                                    <th>Menu</th>
                                 
                                </tr>
                            </thead>
                            <tbody>
                                {rest.map((an) => (
                                    <tr key={an.id}>
                                        <td>{an.id}</td>
                                        <td>{an.name}</td>
                                        <td>{an.description}</td>
                                        <td>{an.location}</td>
                                        <td>{an.restaurantImage}</td>
                                        <td>
                                            <LinkContainer to={`/view-meal-customer/${an.id}/${p.id}`}>
                                                <NavLink><Button className="b-button">View Menu</Button></NavLink>
                                            </LinkContainer>
                                        </td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}
