import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ id, title, description, onEdit, onDelete }) => {
  const navigate = useNavigate()
  return (
    <Card className='mb-4 shadow-sm border-light'>
      <Card.Body>
        <Card.Title className='mb-2 text-primary'>{title}</Card.Title>
        {/* <Card.Text className='text-muted'>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Card.Text> */}
        <div className='d-flex justify-content-between mt-3'>
          <div>
            <Button
              variant='outline-primary'
              className='me-2'
              onClick={() => navigate(`/myblogs/${id}`)}
            >
              View
            </Button>
            <Button variant='outline-primary' className='me-2' onClick={onEdit}>
              Edit
            </Button>
            <Button variant='danger' onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default BlogCard
