import { Container, Row, Col } from "react-bootstrap";
import { AdminNavbar } from "./AdminNavbar";
import './AdminPage.css'; // Import custom CSS file for additional styling

export function AdminPage() {
  return (
    <Container fluid className="admin-page-container">
      <Row className="min-vh-100">
        <Col lg={3} className="admin-sidebar">
          <AdminNavbar />
        </Col>
        
      </Row>
    </Container>
  );
}
