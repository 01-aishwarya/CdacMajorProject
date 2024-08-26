
import { LinkContainer} from "react-router-bootstrap";
import { Nav,NavLink} from "react-bootstrap";
import {Container,Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";

export function CustomerNavbar(props)
{
        const navigate=useNavigate();


        return(
                <>
                
               <Container>
                <Row className="mb-4">
                <LinkContainer to="/see-all-customers"> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}}>Registered Customers</Button></NavLink>
                
                </LinkContainer>

                </Row>
              
                <Row className="mb-4">
                <LinkContainer to="/see-all-restaurants"> 
                <NavLink><Button style={{backgroundColor:"#82E0AA "}}>Registered Restaurants</Button> </NavLink>
                </LinkContainer>
                
                </Row>

                <Row className="mb-4">
               
    
    <LinkContainer to="/log-in"> 
    <NavLink className="text-success" ><Button style={{backgroundColor:"#82E0AA "}}>Log Out</Button></NavLink>
    
    </LinkContainer>

   

                </Row>
               
               </Container>
     
                </>
        );
}