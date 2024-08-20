import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBox = ({ value, onChange, placeholder = "Search...", ...props }) => {
  return (
    <Form.Control
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
};

export default SearchBox;
