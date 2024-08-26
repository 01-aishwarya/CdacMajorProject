import { Form,Button,Container ,Row,Col,Alert} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios
 from "axios";
 import { useParams } from "react-router-dom";
 import { Toast,ToastContainer } from "react-bootstrap";
import {getResByIdAxios, updateResAxios } from "../../../services/restaurantService/restaurantCrusAxios";
import {getMealByIdAxios, updateMealAxios} from "../../../services/mealService/mealCrudAxios";
import { getOrderByIdAxios, updateOrderAxios } from "../../../services/orderService/orderCrudAxios";


export const UpdateOrderByIdComponent = () => {



  const[order,setOrder] = useState({ PaymentType:'',Quantity:'',Delivery:'',Customer_Id:'',Meal_Id:''})

const [showToast, setShowToast] = useState(false);
const [showToastTwo, setShowToastTwo] = useState(false);
//const p=useParams();
const p=2;

const [token, setToken] = useState(localStorage.getItem("token_customer"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

useEffect(()=>{
  getOrder();
},[])


const handleCloseToast = () => {
  setShowToast(false);
}
const handleCloseToastTwo = () => {
  setShowToastTwo(false);
}


  const handleSubmit=(e)=>{
    e.preventDefault();
    saveOrder();
  }

  async function saveOrder()
  {
    try{
     
      const res=await updateOrderAxios(order);
      console.log(res);
      setShowToast(true);
    }
    catch(err)
    {
      console.log(err);
      setShowToastTwo(true);
    }
  }

  async function getOrder(){
    try{
      const res=await getOrderByIdAxios(p);
      setOrder(res.data[0]);
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const handleForm=(e)=>{

    setOrder({
      ...order,
      [e.target.name]:e.target.value
    });
  }

  return (
  
         <Container className="mt-5" style={{backgroundColor:"#AED6F1",width:"900px",border:"1px solid white",borderRadius:"20px "}}>
         <Container style={{backgroundColor:"#AED6F1"}}>
          <Alert className="mt-5 d-flex justify-content-center text-white" style={{backgroundColor:"#AED6F1"}}>
            <h2>Welcome to order Updation</h2>
          </Alert>
         </Container>

         <Container  style={{backgroundColor:"#AED6F1"}}>
         <Row >
         
         <Form onSubmit={handleSubmit}  >
         <Row>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>payemnt type</Form.Label>
        <Form.Control type="text" name="PaymentType" onChange={handleForm}  placeholder={order.paymentType} />
      </Form.Group>
         </Col>
         <Col lg={4} >

         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Delivery</Form.Label>
        <Form.Control type="text" name="Delivery" onChange={handleForm}  placeholder={order.delivery} />
      </Form.Group>
         
         </Col>
         <Col lg={4} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>quantity </Form.Label>
        <Form.Control type="text" name="Quantity" onChange={handleForm} placeholder={order.quantity} />
      </Form.Group>
         </Col>
         </Row>
         <Row>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label>customer id</Form.Label>
         <Form.Control type="text" name="Customer_Id" onChange={handleForm}  placeholder={order.customer_Id} />
      </Form.Group>
         </Col>
         <Col lg={6} >
         <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label>meal id</Form.Label>
         <Form.Control type="text" name="Meal_Id" onChange={handleForm}  placeholder={order.meal_Id} />
      </Form.Group>
         </Col>
         
         </Row>
        
         <Row>
        <Col  className="d-flex justify-content-center" style={{backgroundColor:"#AED6F1"}}>
        <Button variant="warning" type="submit">
      Update order
      </Button>
        </Col>
         </Row>
         
                </Form>
            
         </Row>
         </Container>
         <ToastContainer position="top-end">
                <Toast bg="warning" onClose={handleCloseToast} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Confirmation</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">order Edited</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer position="top-end">
                <Toast bg="danger" onClose={handleCloseToastTwo} show={showToastTwo} delay={3000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Confirmation</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Problem in editing order</Toast.Body>
                </Toast>
            </ToastContainer>
         </Container>
   
  );
};