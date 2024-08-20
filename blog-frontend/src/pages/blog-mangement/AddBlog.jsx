// AddBlog.js
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik, ErrorMessage, FormikProvider } from 'formik';
import * as Yup from 'yup';
import CKEditorComponent from '../../components/CKEditorComponent ';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters long'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters long'),
});

const AddBlog = ({ initialValues, onSubmit }) => {
  
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit
  });

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.title && formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">
                <ErrorMessage name="title" />
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <CKEditorComponent name={"description"} setFieldValue={formik.setFieldValue} values={formik.values} />
              <Form.Control.Feedback type="invalid">
                <ErrorMessage name="description" />
              </Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </FormikProvider>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBlog;
