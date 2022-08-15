import Navbar from "./navbar";
import LoginModal from "./auth/login";
import RegisterComponent from "./auth/register";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <LoginModal />
      <ToastContainer />
      <RegisterComponent />
      <Footer />
    </>
  );
}
