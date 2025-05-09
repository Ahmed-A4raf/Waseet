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
import ProfileCustomer from "../customer/ProfileCustomer";
import OverViewAdmin from "../admin/supPagesAdmin/OverViewAdmin";
import CategoriesAmin from "../admin/supPagesAdmin/CategoriesAmin";
import UsersAdmin from "../admin/supPagesAdmin/UsersAdmin";
import OrdersAdmin from "../admin/supPagesAdmin/OrdersAdmin";
import AllProductsAdmin from "../admin/supPagesAdmin/AllProductsAdmin";
import CreateCategoriesAdmin from "../admin/categories/CreateCategoriesAdmin";
import EditCategoriesAdmin from "../admin/categories/EditCategoriesAdmin";
import OrderDetails from "../pages/shop/OrderDetails";
import OrderCustomer from "../customer/OrderCustomer";
import DetailsCustomerOrder from "../serviceProvider/orderSp/DetailsCustomerOrder";
import AllOrdersCustomer from "../customer/AllOrdersCustomer";
import DetailsAllOrders from "../admin/ordersAdmin/DetailsAllOrders";
import Payment from "../payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/search", element: <Search /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/shop/:id", element: <SingleProduct /> },
      { path: "/contact", element: <Contact /> },
      //! Customer Routes
      { path: "/ProfileCustomer", element: <ProfileCustomer /> },
      { path: "/order-details", element: <OrderDetails /> },
      { path: "/orderCustomer", element: <AllOrdersCustomer /> },
      { path: "/orderCustomer/:id", element: <OrderCustomer /> },
      { path: "/payment", element: <Payment /> },
    ],
  },
  //!  Service Provider Routes
  {
    path: "/dashboard",
    element: <ServiceProvider />,
    children: [
      { path: "/dashboard", element: <OverviewSp /> },
      { path: "/dashboard/profile", element: <ProfileSp /> },
      { path: "/dashboard/addProduct", element: <AddProduct /> },
      { path: "/dashboard/addProduct/creat", element: <CreatProduct /> },
      { path: "/dashboard/addProduct/edit/:id", element: <EditProduct /> },
      { path: "/dashboard/orders", element: <OrdersSp /> },
      {
        path: "/dashboard/orders/detailsCustomerOrder/:orderId",
        element: <DetailsCustomerOrder />,
      },
    ],
  },
  //! Admin Routes
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      { path: "/admin", element: <OverViewAdmin /> },
      { path: "/admin/categories", element: <CategoriesAmin /> },
      { path: "/admin/categories/create", element: <CreateCategoriesAdmin /> },
      { path: "/admin/categories/edit/:id", element: <EditCategoriesAdmin /> },
      { path: "/admin/AllProducts", element: <AllProductsAdmin /> },
      { path: "/admin/users", element: <UsersAdmin /> },
      { path: "/admin/orders", element: <OrdersAdmin /> },
      { path: "/admin/orders/details/:orderId", element: <DetailsAllOrders /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgetpass",
    element: <Forgetpass />,
  },
  // {
  //   path: "*",
  //   element:<Login  />
  // }
]);

export default router;
