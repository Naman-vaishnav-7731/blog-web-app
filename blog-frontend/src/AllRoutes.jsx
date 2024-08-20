import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Home from './pages/Home'
import ManageBlog from './pages/blog-mangement/ManageBlog'
import BlogDetail from './pages/blog-mangement/BlogDetail'
import ProtectedRoute from './libs/ProtectedRoute'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/signup' element={<SignUp />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/myblogs' element={<ManageBlog />} />
        <Route path='/myblogs/:id' element={<BlogDetail />} />
      </Route>
    </Routes>
  )
}

export default AllRoutes
