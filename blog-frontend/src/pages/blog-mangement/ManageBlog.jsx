import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import BlogCard from '../../components/base/Blog/BlogCard'
import SearchBox from '../../components/base/SearchBox'
import { useState } from 'react'
import ModelComponent from '../../components/ModelComponent'
import AddBlog from './AddBlog'
import Loader from '../../components/Loader'
import { useImmer } from 'use-immer'
import { toast } from 'react-toastify'
import axios from 'axios'
import apiPath from '../../apiPath'
import { useSelector } from 'react-redux'
import useDebounce from '../../hooks/useDebounce'
import NoRecordFound from '../../components/NoRecordFound'
import Swal from 'sweetalert2'

const initialVal = {
  title: '',
  description: ''
}

const BlogList = () => {
  const { userInfo, accessToken } = useSelector((state) => state?.auth)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [initialValues, setInitialValues] = useState(initialVal)
  const [filterData, setFilterData] = useImmer({
    searchText: '',
    pageSize: 10,
    pageIndex: 0
  })

  const searchQuery = useDebounce(searchTerm, 1000)

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${apiPath.getAllBlog}/${userInfo?._id}?search=${filterData?.searchText}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      if (response.status === 200 && response?.data?.code == 200) {
        setBlogs(response)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true)
    values = { ...values, userId: userInfo?._id }
    try {
      if (values?._id) {
        var response = await axios.put(
          `${apiPath.blog}/${values?._id}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
      } else {
        var response = await axios.post(apiPath.blog, values, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
      }
      if (response.status === 200 && response?.data?.code == 200) {
        toast.success(response?.data?.message)
        resetForm({ values: '' })
        fetchBlogs()
        setShowModal(false)
      } else {
        toast.error(response?.data?.message)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('Something Went Wrong')
    }
  }

  const handleDelete = (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this blog !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`${apiPath.blog}/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          if (response.status === 200 && response?.data?.code == 200) {
            toast.success(response?.data?.message)
            fetchBlogs()
          } else {
            toast.error(response?.data?.message)
          }
        }
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('Something Went Wrong')
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [filterData])

  useEffect(() => {
    if (searchQuery) {
      setFilterData((draft) => {
        draft.searchText = searchQuery
      })
    } else {
      setFilterData((draft) => {
        draft.searchText = ''
      })
    }
  }, [searchQuery])

  return (
    <Container className='mt-5'>
      {loading && <Loader />}
      <Row className='mb-4'>
        <Col className='d-flex justify-content-end align-items-center'>
          <SearchBox
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            placeholder='Search Blog by title'
            className='me-2 w-50'
          />
          <Button
            variant='warning'
            onClick={() => {
              setShowModal(true)
              setInitialValues(initialVal)
            }}
          >
            Create Blog
          </Button>
        </Col>
      </Row>
      <Row>
        {blogs?.data?.data?.length > 0
          ? blogs?.data?.data?.map((blog) => (
              <Col md={4} key={blog._id}>
                <BlogCard
                  id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  onEdit={() => {
                    setShowModal(true)
                    setInitialValues(blog)
                  }}
                  onDelete={() => handleDelete(blog._id)}
                />
              </Col>
            ))
          : !loading && <NoRecordFound />}
      </Row>
      <ModelComponent
        title={'Create Blog'}
        onClose={() => setShowModal(false)}
        show={showModal}
      >
        <AddBlog initialValues={initialValues} onSubmit={onSubmit} />
      </ModelComponent>
    </Container>
  )
}

export default BlogList
