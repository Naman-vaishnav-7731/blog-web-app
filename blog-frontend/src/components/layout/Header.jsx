import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useAuthenticated from '../../hooks/useAuthenticate'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Loader from '../Loader'
import { logOut } from '../../redux/features/authSlice'

const Header = () => {
  const isAuth = useAuthenticated()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setLoading(true)
    try {
      // Implementing dealy like api calling for enhance the user experience
      const response = new Promise((resolve) => {
        setTimeout(() => resolve({ code: 200 }), 1000)
      })
      response
        .then((res) => {
          if (res?.code == 200) {
            dispatch(logOut())
            toast.success('Logout Successfully !')
            navigate('/')
          }
        })
        .catch((error) => {
          console.log(error)
        })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('Something Went Wrong')
    }
  }

  return (
    <>
      {loading && <Loader />}
      <Navbar bg='dark' expand='lg'>
        <Container>
          <Navbar.Brand className='text-light '>Tech Trends</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/' className='text-light'>
                Home
              </Nav.Link>
              {isAuth && (
                <Nav.Link as={Link} to='/myblogs' className='text-light'>
                  My Blogs
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <div>
            {!isAuth && (
              <>
                {' '}
                <Link to={'/auth/login'}>
                  <Button
                    variant='outline-warning'
                    className='me-2'
                    id='login-custom-btn'
                  >
                    Login
                  </Button>
                </Link>
                <Link to={'/auth/signup'}>
                  <Button variant='warning' className='me-2'>
                    Signup
                  </Button>
                </Link>
              </>
            )}

            {isAuth && (
              <Button variant='warning' onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
