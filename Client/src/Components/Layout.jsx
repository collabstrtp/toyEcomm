import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import bg from "../assets/bg.png";
const Layout = () => {
  const location = useLocation();
  const isFixed = location.pathname === "/productlist";
  return (
    <div
      className="mt-0 pt-2 overflow-hidden bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
      }}
    >
      {" "}
      <Navbar fixed={isFixed} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
