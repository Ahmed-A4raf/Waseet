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
import ReviewSp from "../serviceProvider/supPages/ReviewSp";
import ProfileCustomer from "../customer/ProfileCustomer";
import OverViewAdmin from "../admin/supPagesAdmin/OverViewAdmin";
import CategoriesAmin from "../admin/supPagesAdmin/CategoriesAmin";
import UsersAdmin from "../admin/supPagesAdmin/UsersAdmin";
import OrdersAdmin from "../admin/supPagesAdmin/OrdersAdmin";


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
      {path: "/ProfileCustomer",element:<ProfileCustomer />},
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
      {path: "/dashboard/reviews",element: <ReviewSp />},
    ],
  },
  //! Customer Routes
  // {
  //   path: "/profileCustomer",
  //   element: <ProfileCustomer />
  // },
  //! Admin Routes
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {path: "/admin",element: <OverViewAdmin />},
      {path: "/admin/categories",element: <CategoriesAmin />},
      {path: "/admin/categories/create",element: <h1>categories create</h1> },
      {path: "/admin/categories/edit/:id",element: <h1>categories edit</h1> },
      {path: "/admin/categories/delete/:id",element: <h1>categories delete</h1> },
      {path: "/admin/users",element: <UsersAdmin />},
      {path: "/admin/orders",element: <OrdersAdmin />},
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
