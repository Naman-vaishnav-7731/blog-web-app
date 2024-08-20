import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div className="loader-container d-flex justify-content-center align-items-center">
      <Spinner animation="border" variant="warning" />
    </div>
  );
};

export default Loader;
