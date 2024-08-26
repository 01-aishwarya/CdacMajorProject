import { Container, Row, Col } from "react-bootstrap";
import { Login } from "./Login";
import './Home.css'; // Import custom CSS file for additional styling

export function Home() {
  return (
    <Container fluid className="home-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col lg={6} className="text-center">
          <Login />
        </Col>
      </Row>
    </Container>
  );
}
