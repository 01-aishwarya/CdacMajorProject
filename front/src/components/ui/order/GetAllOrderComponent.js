
import axios from "axios";
import { useState, useEffect } from "react";
import { Card ,Container,Row,Col,Table,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {UpdateCustomerByIdComponent} from  '../customer/UpdateCustomerByIdComponent';

import {getAllMealAxios ,deleteMealAxios} from "../../../services/mealService/mealCrudAxios";
import { getAllOrderAxios,deleteOrderAxios } from "../../../services/orderService/orderCrudAxios";

export function GetAllOrderComponent() {
        const [order, setOrder] = useState([]);
        const [id, setId] = useState(0);
   //     const navigate=useNavigate();

   const [token, setToken] = useState(localStorage.getItem("token_customer"));
//to set defaults of axios header
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

        useEffect(() => {
                fetchOrder();
        }, []);

        async function fetchOrder() {
                try {
                        const response = await getAllOrderAxios();
                        console.log(response.data);
                        setOrder(response.data);
                }
                catch (err) {
                        console.log(err);
                }
        }

        async function  deleteOrderById()  {
                try {
                        const response = await deleteOrderAxios(id);
                        console.log(response.data);
                       fetchOrder();
                }
                catch (err) {
                        console.log(err);
                }
        }
const editRes=()=>
{
        <UpdateCustomerByIdComponent/>
}
        const deleteOrder=()=>
                {
                        const y=prompt("do u want to delete type yes else no");
                        console.log(y);
                        if(y=="yes")
                                {
                                        deleteOrderById() ;
                                        
                                }
                               
                }

               

        return (
                <>
<Container>
                <Row>
                

                        <Col lg={9} style={{backgroundColor:"#AED6F1",marginTop:"20px",border:"1px solid white",borderRadius:"20px "}}>
                        <Container className="mb-3">
   <Container >
                    
     
   <Table striped bordered hover style={{backgroundColor:"#AED6F1",marginTop:"20px"}}>
                     
   <thead>
        <tr>
        
        <th>Id</th>
          <th>PaymentType</th>
          <th>Quantity</th>
          <th>Delivery</th>
          <th>Customer_Id</th>
          <th>Meal_Id</th>
         
          <th>Edit</th>
          <th>Delete</th>

        </tr>
      </thead>   
                                {
                             order.map((an) => {
                                        return (
                                               
                                            
                                              
      <tbody >
        <tr >
        <td style={{backgroundColor:"#EBF5FB"}}>{an.id}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.paymentType}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.quantity}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.delivery}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.customer_Id}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.meal_Id}</td>
               

                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setId(an.id);
                       editRes();
              //  navigate(`UpdateRestaurnatByIdComponent/${an.id}`);
                }} >Edit</Button></td>
              
                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setId(an.id);
                deleteOrder();
                }} >Delete</Button></td>
        </tr>
      </tbody>
                                              
                                                        
                                        );
                                })
                        }
                        </Table>
                               
                      
                      </Container>
                      </Container>
                        </Col>
                </Row>

            
           </Container> 
                </>
        );
}