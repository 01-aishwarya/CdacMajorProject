import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Image, Modal, Form, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteOrderAxios, deleteOrderByCustAxios, getOrderByIdAxios, saveOrderAxios, updateOrderAxios } from "../../../services/orderService/orderCrudAxios";
import { getAllMealAxios } from "../../../services/mealService/mealCrudAxios";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-bootstrap";
import './GetMealByResId.css'; // Import custom CSS file
import { getMealByIdAxios } from "../../../services/mealService/mealCrudAxios";
import upi from "./upi.jpeg";
import { getMenuByResIdAxios } from "../../../services/menuService/menuCrudAxios";
import abc from "./abc.jpg";


export function GetMealByResId() {
    const [meal, setMeal] = useState([]);
    const [orders, setOrders] = useState([]);
    const [orderBill, setOrderBill] = useState(0);
    const [oobill, setOoBill] = useState([]);

    const [order, setOrder] = useState({
        Id: '', PaymentType: '', Quantity: '', Delivery: '', TransactionId: '', Customer_Id: '', Meal_Id: ''
    });
    const [token, setToken] = useState(localStorage.getItem("token_customer"));
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const [showAddToCartModal, setShowAddToCartModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [showUPI, setShowUPI] = useState(false);
    const navigate = useNavigate();
    const p = useParams();



    useEffect(() => {
        fetchMeal();
        getOrders();
    }, []);

    async function fetchMeal() {
        try {
            const response = await getMenuByResIdAxios(p.id);
            fun(response.data[0].id);
        } catch (err) {
            console.log(err);
        }
    }

    async function save() {
        try {
            await saveOrderAxios(order);
            getOrders();
        } catch (err) {
            console.log(err);
        }
    }

    async function update() {
        try {
            await updateOrderAxios(order);
            getOrders();
        } catch (err) {
            console.log(err);
        }
    }

    async function getOrders() {
        try {
            const response = await getOrderByIdAxios(p.cust);
            setOrders(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function fun(id) {
        try {
            const response = await getMealByIdAxios(id);
            setMeal(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteOrderById() {
        try {
            await deleteOrderAxios(order.Id);
            getOrders();
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteCartById() {
        try {
            await deleteOrderByCustAxios(p.cust);
            getOrders();
            setOrderBill(0); // Reset order bill
            setB(0);
            setShowUPI(false); 
        } catch (err) {
            console.log(err);
        }
    }

    function handleAddToCart() {
        if (quantity && selectedMeal) {
            const newOrder = {
                Customer_Id: p.cust,
                Meal_Id: selectedMeal.id,
                Delivery: true,
                TransactionId: 0,
                PaymentType: "online",
                Quantity: quantity
            };

            saveOrderAxios(newOrder)
                .then(() => {
                    setQuantity('');
                    setSelectedMeal(null);
                    setShowAddToCartModal(false);
                    getOrders(); // Refresh orders list
                })
                .catch(err => {
                    console.error("Error adding to cart:", err);
                    alert("Failed to add item to cart. Please try again.");
                });
        } else {
            alert("Please enter a quantity and select a meal.");
        }
    }

    function handleEdit() {
        if (order.Quantity) {
            update(); // Update order
            setShowEditModal(false);
        } else {
            alert("Please enter a quantity");
        }
    }

    function handleDelete() {
        deleteOrderById();
        setShowDeleteModal(false);
    }

    function handleEmptyCart() {
        deleteCartById();
        setShowEmptyCartModal(false);
       

    }

    const deleteOrder = (id) => {
        setOrder({ ...order, Id: id });
        setShowDeleteModal(true);
    }

    const emptyCart = () => {
        setShowEmptyCartModal(true);

    }

           var total = 0; 
           function bill() {
            setB(0); // Reset total bill before calculation
            billG(); // Calculate bill
        }
const [mealBill,setMealBill]=useState(0);   
const [b,setB]=useState(0);   
async function billG() {
    try {
        // Fetch orders and meals concurrently
        const [ordersResponse, mealsResponse] = await Promise.all([
            getOrderByIdAxios(p.cust),
            getAllMealAxios()
        ]);

        // Extract data
        const ordersData = ordersResponse.data;
        const mealsData = mealsResponse.data;

        // Map orders to get total bill
        let total = 0;
        for (const order of ordersData) {
            const meal = mealsData.find(meal => meal.id === order.meal_Id);
            if (meal) {
                total += parseInt(order.quantity) * meal.price;
            }
        }

        // Update state with the calculated total
        setB(total);
    } catch (err) {
        console.log(err);
    }
}



function payOnline() {
    bill(); // Calculate bill
    setTimeout(() => {
        setShowUPI(true); // Show UPI image after bill is updated
    }, 100); // Delay to ensure state is updated
}


    return (
        <Container className="meal-by-res-container">
            <Row>
                <Col lg={3} className="sidebar">
                    <Row className="mb-4">
                        <Col lg={5}>
                            <LinkContainer to={`/customer-page/${p.cust}`}>
                                <NavLink><Button className="b-button">Go Back</Button></NavLink>
                            </LinkContainer>
                        </Col>
                        <Col lg={6}>
                            <h6 className="b-button">Bill: ${b}</h6>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col lg={6}>
                            <Button
                                className="b-button-danger"
                                onClick={emptyCart}>Empty Entire Cart</Button>
                        </Col>
                        <Col lg={4}>
                            <Button
                                className="b-button-warning"
                                onClick={payOnline} // Calculate bill and show UPI image
                            >
                                Pay Online
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="sidebar">
                    {showUPI && (
                        <Image
                            className="custom-carousel-image"
                            src={upi}
                            alt="Payment Image"
                            style={{ width: '100%', height: 'auto' }} // Ensure image fits the block
                        />
                    )}
                </Col>
                <Col lg={9} className="content">
                    <Container className="mb-3">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                
                                    <th>Quantity</th>
                                    <th>Delivery</th>
                                    <th>Customer Id</th>
                                    <th>Meal Id</th>
                                    <th>Edit</th>
                                    <th>Remove From Cart</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                       
                                        <td>{order.quantity}</td>
                                        <td>{order.delivery.toString()}</td>
                                        <td>{order.customer_Id}</td>
                                        <td>{order.meal_Id}</td>
                                        <td>
                                            <Button
                                                className="b-button-danger"
                                                onClick={() => {
                                                    setOrder({
                                                        Id: order.id,
                                                        Customer_Id: order.customer_Id,
                                                        Meal_Id: order.meal_Id,
                                                        Delivery: order.delivery,
                                                        TransactionId: order.TransactionId,
                                                        PaymentType: order.PaymentType,
                                                        Quantity: order.quantity
                                                    });
                                                    setShowEditModal(true);
                                                }}>Edit</Button>
                                        </td>
                                        <td>
                                            <Button
                                                className="b-button-danger"
                                                onClick={() => deleteOrder(order.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </Row>

            {/* Add To Cart Modal */}
            <Modal show={showAddToCartModal} onHide={() => setShowAddToCartModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add To Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Enter quantity"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShowAddToCartModal(false);
                        setQuantity(''); // Clear quantity on close
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                value={order.Quantity}
                                onChange={(e) => setOrder({ ...order, Quantity: e.target.value })}
                                placeholder="Enter new quantity"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this item from the cart?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Empty Cart Modal */}
            <Modal show={showEmptyCartModal} onHide={() => setShowEmptyCartModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Empty Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to empty the entire cart?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEmptyCartModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleEmptyCart}>
                        Empty Cart
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col lg={9} className="content">
                    <Container className="mb-3">
                        <Row>
                            {meal.map((mealItem) => (
                                <Col key={mealItem.id} md={4} className="mb-4">
                                    <Card className="meal-card">
                                
                                        <Card.Img variant="top"   src={mealItem.mealImage} style={{ height: '200px', objectFit: 'cover' }} />
                                  
                                        <Card.Body>
                                            <Card.Title>{mealItem.mealName}</Card.Title>
                                            <Card.Text>
                                                Price: ${mealItem.price}<br />
                                                Description: {mealItem.mealDescription}<br />
                                                Meal ID: {mealItem.id}
                                                
                                              
                                            </Card.Text>
                                            <Button
                                                className="b-button-danger"
                                                onClick={() => {
                                                    setSelectedMeal(mealItem);
                                                    setShowAddToCartModal(true);
                                                }}
                                            >Add To Cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Col>
            </Row>


          


        </Container>
    );
}
