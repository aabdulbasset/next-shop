import Navbar from "./navbar";
import LoginModal from "./auth/login";
import RegisterComponent from "./auth/register";
import Footer from "./footer";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <LoginModal />
      <RegisterComponent />
      <Footer />
    </>
  );
}
