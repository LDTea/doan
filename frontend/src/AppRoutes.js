import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import StuffPage from './pages/Stuff/StuffPage'
import CartPage from './pages/Cart/CartPage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import AuthRoute from './Component/AuthRoute/AuthRoute'
import CheckoutPage from './pages/Checkout/CheckoutPage'
import PaymentPage from './pages/Payment/PaymentPage'
import OrderTrackPage from './pages/OrderTrack/OrderTrackPage'
import ProfilePage from './pages/Profile/ProfilePage'
import OrderPage from './pages/Orders/OrderPage'
import Dashboard from './pages/Dashboard/Dashboard'
import StuffsAdminPage from './pages/StuffsAdmin/StuffAdminPage'
import AdminRoute from './Component/AdminRoute/AdminRoute'
import StuffEditPage from './pages/StuffEdit/StuffEditPage'
import UsersPage from './pages/UserPage/UserPage'
import UserEditPage from './pages/UserEdit/UserEditPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage/>}/>
      <Route path="/tag/:tag" element={<HomePage/>}/>
      <Route path="/stuff/:id" element={<StuffPage />} />
      <Route path="/cart/" element={<CartPage />} />
      <Route path="/login/" element={<LoginPage />} />
      <Route path="/register/" element={<RegisterPage />} />
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <PaymentPage />
          </AuthRoute>
        }
      />
      <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <OrderTrackPage />
          </AuthRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      />
      <Route
        path="/orders/:filter?"
        element={
          <AuthRoute>
            <OrderPage />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
         path="/admin/stuffs/:searchTerm?"
         element={
           <AdminRoute>
             <StuffsAdminPage />
           </AdminRoute>
         }
       />
      <Route
         path="/admin/addStuff"
         element={
           <AdminRoute>
             <StuffEditPage />
           </AdminRoute>
         }
       />
       <Route
         path="/admin/editStuff/:stuffId"
         element={
           <AdminRoute>
             <StuffEditPage />
           </AdminRoute>
         }
       /> 
       <Route
         path="/admin/users/:searchTerm?"
         element={
           <AdminRoute>
             <UsersPage />
           </AdminRoute>
         }
       />
       <Route
         path="/admin/editUser/:userId"
         element={
           <AdminRoute>
             <UserEditPage />
           </AdminRoute>
         }
       />
    </Routes>
  )
}



