
import axios from "axios";
import { useState, useEffect } from "react";
import { Card ,Container,Row,Col} from "react-bootstrap";
import { NavigationBar } from "../library/NavigationBar";
import { getAddressById, getAllAddress } from "../../../services/addressService/addressCrudAxios";

export function GetAllAddress() {
        const [address, setAddress] = useState([]);

        useEffect(() => {
                fetchAddress();
        }, []);

        async function fetchAddress() {
                try {
                        const response = await getAddressById(id);
                        console.log(response.data);
                        setAddress(response.data);
                }
                catch (err) {
                        console.log(err);
                }
        }

        return (
                <>
<Container className="mb-3">
   <Container >
                    
     
   
                        <Row >
                               
                                {
                                        
                                address.map((an) => {
                                        return (
                                                <Col lg={4} >
                                                        <Card border="primary" className="bg-light" style={{ width: '18rem',marginTop:"100px"  }} >
                                                        <Card.Header>{an.Addr}</Card.Header>
                                                                <Card.Body>
                                                                        <Card.Title>{an.City}</Card.Title>
                                                                        <Card.Text>
                                                                        <p>{an.Pincode}</p>
                                                                               
                                                                        </Card.Text>

                                                                </Card.Body>
                                                        </Card>
                                                        </Col>
                                        );
                                })
                        }
                               
                        </Row>
                      </Container>
                      </Container>
                </>
        );
}