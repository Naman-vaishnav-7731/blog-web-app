import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const LandingSection = () => {
  
  const sectionStyle = {
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  };

  return (
    <div style={sectionStyle} className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col>
            <h1 style={{ fontSize: '2.5rem' }}>Welcome to My Blog</h1> {/* Adjusted size */}
            <p className="lead" style={{ fontSize: '1.2rem' }}>
              Discover the latest insights, tips, and stories in the world of blogging.
              Join our community of avid readers and writers.
            </p>
            <Button variant="light" size="lg" className="mx-2">
              Read Latest Posts
            </Button>
            <Button variant="outline-light" size="lg" className="mx-2">
              Subscribe Now
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingSection;

