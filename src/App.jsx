import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { UserState } from './Context/Usercontext'
import Loader from './Utilis/Loader'
import Admin from './Panels/Admin'
import Middleware from './Protectedroutes/Middleware'
import ProtectedRoutes from './Protectedroutes/ProtectedRoutes'

const App = () => {

  const { loading, user } = UserState();

  return (
    <>
      {loading && <Loader />}
      <Middleware />
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoutes allowedRoles={[user?.is_admin]}>
              <Admin />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  )
}

export default App
