import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Card, Alert, Row, Col, Container } from "react-bootstrap";
import './AboutUs.css'; // Import custom CSS file for additional styling

export const AboutUs = () => {
  return (
    <Container className="aboutus-container">
      <Row className="justify-content-center">
        <Col lg={12}>
          <Alert className="text-center aboutus-header">
            <h2>TastyTrails</h2>
          </Alert>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {[{
          name: "Hemant Shirsath",
          subtitle: "240340320000",
        }, {
          name: "Anuj Shrivastava",
          subtitle: "240340320000",
        }, {
          name: "Purva Salvi",
          subtitle: "240340320002",
        }, {
          name: "Vrundali Patil",
          subtitle: "240340320002",
        }, {
          name: "Aishwarya Mundhe",
          subtitle: "240340320002",
        }].map((member, index) => (
          <Col lg={4} className="mt-5" key={index}>
            <Card className="aboutus-card">
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{member.subtitle}</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Card.Link href="#">
                  <SiGmail className="aboutus-icon" />
                </Card.Link>
                <Card.Link href="#">
                  <FaInstagram className="aboutus-icon" />
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
