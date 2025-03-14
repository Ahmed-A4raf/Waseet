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
import ServiceProvider from "../serviceProvider/ServiceProvider";
import AdminDashboard from "../admin/AdminDashboard";
import OverviewSp from "../serviceProvider/supPages/OverviewSp";
import ProfileSp from "../serviceProvider/supPages/ProfileSp";
import AddProduct from "../serviceProvider/supPages/AddProduct";
import CreatProduct from "../serviceProvider/addProduct/CreatProduct";
import EditProduct from "../serviceProvider/addProduct/EditProduct";
import OrdersSp from "../serviceProvider/supPages/OrdersSp";
import PaymentsSp from "../serviceProvider/supPages/PaymentsSp";
import ReviewSp from "../serviceProvider/supPages/ReviewSp";


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
  //!  Service Provider Routes
  {
    path: "/dashboard",
    element: <ServiceProvider />,
    children: [
      {path: "/dashboard",element: <OverviewSp />},
      {path: "/dashboard/profile",element: <ProfileSp />},
      {path: "/dashboard/addProduct",element: <AddProduct />},
      {path: "/dashboard/addProduct/creat",element: <CreatProduct />},
      {path: "/dashboard/addProduct/edit/:id",element: <EditProduct />},
      {path: "/dashboard/orders",element: <OrdersSp />},
      {path: "/dashboard/payments",element: <PaymentsSp />},
      {path: "/dashboard/reviews",element: <ReviewSp />},
    ],
  },
  //! Admin Routes
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {path: "/admin",element: <h1>Admin overview</h1>},
      {path: "/admin/categories",element: <h1>categories</h1>},
      {path: "/admin/categories/create",element: <h1>categories create</h1> },
      {path: "/admin/categories/edit/:id",element: <h1>categories edit</h1> },
      {path: "/admin/categories/delete/:id",element: <h1>categories delete</h1> },
      {path: "/admin/users",element: <h1>users</h1>},
      {path: "/admin/orders",element: <h1>orders</h1>},
      {path: "/admin/orders/details",element: <h1>orders</h1>},
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
    element:<Login  />
  }
]);

export default router;
