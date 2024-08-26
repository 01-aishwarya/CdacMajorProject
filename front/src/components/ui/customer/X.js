
import axios from "axios";
import { useState, useEffect } from "react";
import { Card ,Container,Row,Col,Table,Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {UpdateCustomerByIdComponent} from  './UpdateCustomerByIdComponent';

import { getAllCustomerAxios,deleteCustomerAxios } from "../../../services/customerService/customerCrudAxios";

export function X() {
        const [customer, setCustomer] = useState([]);
        const [id, setId] = useState(0);
   //     const navigate=useNavigate();

        useEffect(() => {
                fetchCustomer();
        }, []);

        async function  fetchCustomer() {
                try {
                        const response = await getAllCustomerAxios();
                        console.log(response.data);
                        setCustomer(response.data);
                }
                catch (err) {
                        console.log(err);
                }
        }

        async function  deleteCustomerById()  {
                try {
                        const response = await deleteCustomerAxios(id);
                        console.log(response.data);
                       fetchCustomer();
                }
                catch (err) {
                        console.log(err);
                }
        }
const editUser=()=>
{
        <UpdateCustomerByIdComponent/>
}
        const deleteUser=()=>
                {
                        const y=prompt("do u want to delete type yes else no");
                        console.log(y);
                        if(y=="yes")
                                {
                                        deleteCustomerById() ;
                                        
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
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th>ConfirmPassword</th>
          <th>Phone</th>
          <th>Address</th>
          <th>City</th>
          <th>Pincode</th>
          <th>Edit</th>
          <th>Delete</th>

        </tr>
      </thead>   
                                {
                              customer.map((an) => {
                                        return (
                                               
                                            
                                              
      <tbody >
        <tr >
        <td style={{backgroundColor:"#EBF5FB"}}>{an.id}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.username}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.email}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.password}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.confirmPassword}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.phone}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.addr}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.city}</td>
                <td style={{backgroundColor:"#EBF5FB"}}>{an.pincode}</td>
                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setId(an.id);
                       editUser();
              //  navigate(`UpdateCustomerByIdComponent/${an.id}`);
                }} >Edit</Button></td>
              
                <td style={{backgroundColor:"#EBF5FB"}}><Button 
                 className="bg-danger"
                onClick={()=>{
                        setId(an.id);
                deleteUser();
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