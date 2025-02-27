import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router.jsx";
import 'remixicon/fonts/remixicon.css'
import "./index.css";

import { store } from "./redux/store.js";
import { Provider } from 'react-redux'


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
