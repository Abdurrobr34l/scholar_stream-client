import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//* Router
import { RouterProvider } from 'react-router'
import { router } from './Routes/MainRoutes'
import AuthProvider from './Context/AuthProvider'
//* React Toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
//* Tanstack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//* Sroll to top on route change
// import ScrollToTop from './Components/ScrollToTop'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        {/* <ScrollToTop/> */}
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
