import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import apiPath from '../../apiPath'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Loader from '../../components/Loader'
import moment from 'moment'
import { useSelector } from 'react-redux'

const BlogDetail = () => {
  const { accessToken } = useSelector((state) => state?.auth)
  const [blogData, setBlogData] = useState(null)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${apiPath.getSingleBlog}/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
      if (response.status === 200 && response?.data?.code == 200) {
        setBlogData(response?.data?.data)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchBlogs()
    }
  }, [])

  return (
    <Container>
      {loading && <Loader />}
      <Row className='justify-content-center'>
        <Col md={8}>
          {blogData && (
            <Card className='my-4 shadow-sm'>
              <h3 className='text-center mb-2 mt-4'>{blogData?.title}</h3>
              <Card.Body>
                <div className='mt-4'>
                  <div
                    className='p-3'
                    style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}
                    dangerouslySetInnerHTML={{ __html: blogData?.description }}
                  />
                </div>
                <div className='mt-4 text-end'>
                  {blogData?.author?.firstname && (
                    <p>
                      <strong>Author:</strong> {blogData?.author?.firstname}{' '}
                      {blogData?.author?.lastname}
                    </p>
                  )}
                  {blogData?.createdAt && (
                    <p>
                      <strong>Created Date:</strong>{' '}
                      {moment(blogData?.createdAt).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </p>
                  )}
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default BlogDetail;
