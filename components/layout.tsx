import Navbar from "./navbar";
import LoginModal from "./auth/login";
import RegisterComponent from "./auth/register";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <main>{children}</main>
      <LoginModal />
      <RegisterComponent />
      <Footer />
    </>
  );
}
