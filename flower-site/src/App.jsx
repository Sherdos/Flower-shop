import { RouterProvider , createBrowserRouter } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Catalog from "./pages/Catalog/Catalog"
import Contacts from "./pages/Contacts/Contacts"
import Delivery from "./pages/Delivery/Delivery"
import Payment from "./pages/Payment/Payment"
import Product from "./pages/Product/Product"
import Reviews from "./pages/Reviews/Reviews"
import Register from "./pages/Register/Register"
import Favorites from "./pages/Favorites/Favorites"
import Login from "./pages/Login/Login"
import Auth from "./components/Layout/Auth"
import './styles/styles.scss'


function App() {
  const router = createBrowserRouter([
       {
        path:'/',
        element:<Layout/>,
        children:[
          {
            path:"/",
            element:<Home/>
          },
          {
            path:"/:id",
            element:<Product/>
          },
          {
            path:"/about",
            element: <About/>
          },
          {
            path:"/catalog",
            element: <Catalog/>
          },
          {
            path:"/contacts",
            element: <Contacts/>
          },
          {
            path:"/delivery",
            element: <Delivery/>
          },
          {
            path:"/home",
            element: <Home/>
          },
          {
            path:"/payment",
            element: <Payment/>
          },
          {
            path:"/reviews",
            element: <Reviews/>
          },
          {
            path:"/favorites",
            element: <Favorites/>
          },
        ],
       },
       {
         path:"/auth",
         element:<Auth/>,
         children:[
          {
            path:"login",
            element: <Login/>,
          },
          {
            path:"register",
            element: <Register/>,
          },
         ]
       },
  ])
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
