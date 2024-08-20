// MyModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModelComponent = ({ show, onClose, title, footer, children }) => (
    <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
    </Modal.Body>
    {footer && (
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    )}
  </Modal>
);

export default ModelComponent;
