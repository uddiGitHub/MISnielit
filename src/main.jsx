import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Login from './pages/Loginpage/Login.jsx'
import ForgotPass from './pages/Loginpage/ForgotPass.jsx'
import StudDashboard from './pages/StudDashboard/StudDashboard.jsx'
import AdminDasboard from './pages/Admin/AdminDasboard.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './pages/Registrationpage/Signup.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPass />
  },
  {
    path: "student-dashboard",
    element: <StudDashboard />
  },
  {
    path: "admin-dashboard",
    element: <AdminDasboard />
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
