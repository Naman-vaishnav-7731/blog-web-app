import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const NoRecordFound = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <Row>
        <Col className="text-center">
          <Card className="border-0 shadow-sm p-4" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <FaSearch size={50} className="mb-3 text-muted" />
              <Card.Title className="mb-3" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                No Blog Found
              </Card.Title>
              <Card.Text className="mb-4">
                We couldn’t find any results matching your search. Please try again with different keywords.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NoRecordFound;
