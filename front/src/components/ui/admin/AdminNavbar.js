
import { LinkContainer} from "react-router-bootstrap";
import { Nav,NavLink} from "react-bootstrap";
import {Container,Row} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {Button} from "react-bootstrap";

export function AdminNavbar(props)
{
        const navigate=useNavigate();


        return(
                <>
                
               <Container>
                <Row className="mb-4">
                <LinkContainer to="/see-all-customers"> 
                <NavLink><Button className="b-button">Registered Customers</Button></NavLink>
                
                </LinkContainer>

                </Row>
              
                <Row className="mb-4">
                <LinkContainer to="/see-all-restaurants"> 
                <NavLink><Button className="b-button">Registered Restaurants</Button> </NavLink>
                </LinkContainer>
                
                </Row>

                <Row className="mb-4">
               
    
    <LinkContainer to="/log-in"> 
    <NavLink className="text-success" ><Button className="b-button"   onClick={() => {
            localStorage.removeItem("token_admin");
            localStorage.clear();
            navigate("/");
          }}>Log Out</Button></NavLink>
    
    </LinkContainer>

   

                </Row>
               
               </Container>
     
                </>
        );
}