import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { UserState } from './Context/Usercontext'
import Loader from './Utilis/Loader'
import Middleware from './Protectedroutes/Middleware'
import ProtectedRoutes from './Protectedroutes/ProtectedRoutes'
import Admin from './Role/Admin'
import Hr from './Role/Hr'

const App = () => {

  const { loading, user } = UserState();

  return (
    <>
      {loading && <Loader />}
      {user && <Middleware />}
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoutes allowedRoles={[0]}>
              <Admin />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/hr/*"
          element={
            <ProtectedRoutes allowedRoles={[1]}>
              <Hr />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  )
}

export default App
