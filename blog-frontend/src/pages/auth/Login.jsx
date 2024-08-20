import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useFormik, FormikProvider, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loader from '../../components/Loader'
import axios from 'axios'
import apiPath from '../../apiPath'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/authSlice';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    try {
      const response = await axios.post(apiPath.login, values)
      if (response.status === 200 && response?.data?.code == 200) {
        toast.success(response?.data?.message);
        resetForm({ values: '' })
        dispatch(setUser({ currentUser: response?.data?.currentUser, accessToken: response?.data?.accessToken }))
        setTimeout(() => navigate("/myblogs", { replace: true }), 1000);
      } else {
        toast.error(response?.data?.message);
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Something Went Wrong");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <Container  className="mt-5 mb-5">
      <Row className="justify-content-center">
      {loading && <Loader />}
        <Col md={6} lg={4}>
          <div className="border rounded p-4 bg-light shadow-sm">
            <h2 className="text-center mb-4">Login</h2>
            <FormikProvider value={formik}>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    className="mb-3"
                  />
                  <Form.Control.Feedback type="invalid">
                    <ErrorMessage name="email" />
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    className="mb-3"
                  />
                  <Form.Control.Feedback type="invalid">
                    <ErrorMessage name="password" />
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="warning"
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-100"
                >
                  Login
                </Button>
              </Form>
            </FormikProvider>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
