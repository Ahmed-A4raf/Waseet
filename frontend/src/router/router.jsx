import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import Contact from "../pages/contact/Contact";
import Forgetpass from "../components/Forgetpass";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/",element: <Home />},
      {path: "/categories/:categoryName",element:<CategoryPage />},
      {path: "/search",element:<Search />},
      {path: "/shop",element:<ShopPage />},
      {path: "/shop/:id",element:<SingleProduct />},
      {path: "/contact",element:<Contact />},
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/forgetpass",
    element: <Forgetpass />
  },
  {
    path: "*",
    element: <h1 className="text-7xl text-red-600 text-center mt-32">404</h1>
  }
]);

export default router;
