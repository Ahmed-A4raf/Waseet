import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
function App() {
  return (
    <>
    <div className="dark:bg-zinc-900 dark:text-zinc-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
    </>
  );
}

export default App;
