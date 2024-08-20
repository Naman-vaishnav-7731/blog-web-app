import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useFormik, FormikProvider, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import Loader from '../../components/Loader'
import axios from 'axios'
import apiPath from '../../apiPath'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const SignupForm = () => {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true)
    try {
      const response = await axios.post(apiPath.signUp, values)
      if (response.status === 200 && response?.data?.code == 200) {
        toast.success(response?.data?.message);
        resetForm({ values: '' })
        setTimeout(() => {
          navigate('/auth/login')
        }, 1000)

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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit
  })

  return (
    <Container className='mt-5 mb-5'>
      {loading && <Loader />}
      <Row className='justify-content-center'>
        <Col md={8} lg={6}>
          <div className='border rounded p-4 bg-light shadow-sm'>
            <h2 className='text-center mb-4'>Signup</h2>
            <FormikProvider value={formik}>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group controlId='firstName'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.firstName && !!formik.errors.firstName
                    }
                    className='mb-3'
                  />
                  <Form.Control.Feedback type='invalid'>
                    <ErrorMessage name='firstName' />
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='lastName'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.lastName && !!formik.errors.lastName
                    }
                    className='mb-3'
                  />
                  <Form.Control.Feedback type='invalid'>
                    <ErrorMessage name='lastName' />
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                    className='mb-3'
                  />
                  <Form.Control.Feedback type='invalid'>
                    <ErrorMessage name='email' />
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isInvalid={
                      formik.touched.password && !!formik.errors.password
                    }
                    className='mb-3'
                  />
                  <Form.Control.Feedback type='invalid'>
                    <ErrorMessage name='password' />
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant='warning' type='submit' className='w-100'>
                  Submit
                </Button>
              </Form>
            </FormikProvider>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupForm
