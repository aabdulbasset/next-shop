import Link from "next/link";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, signOut } from "../utils/firebaseconfig";
import { useRef } from "react";
import { gsap } from "../utils/gsapped";
import { FiUser } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { FaShoppingCart, FaSignOutAlt, FaStore } from "react-icons/fa";

function NavbarLoginComponent() {
  return (
    <div className={"flex gap-2 "}>
      <label
        htmlFor="login-modal"
        className={
          "btn btn-sm md:btn-md btn-ghost rounded-md modal-button text-black"
        }
      >
        Login
      </label>
      <label
        htmlFor="register-modal"
        className={
          "btn btn-sm md:btn-md bg-primary border-none rounded-md text-white"
        }
      >
        Signup
      </label>
    </div>
  );
}
function NavbarUserComponent() {
  return (
    <div className={"dropdown dropdown-hover dropdown-end"}>
      <label tabIndex={0} className="btn btn-secondary m-1 rounded-full">
        <FiUser />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-max"
      >
        <li>
          <Link href="/cart">
            <a href={"/cart"}>
              <FaShoppingCart />
              Cart
            </a>
          </Link>
        </li>
        <li>
          <a onClick={handleSignOut}>
            <FaSignOutAlt /> Sign-out
          </a>
        </li>
      </ul>
    </div>
  );
}

function CustomListItem({ text, children }) {
  return (
    <li
      className={`w-full text-center p-2 font-bold uppercase ${
        text.toLowerCase() == "signup" ? "bg-primary text-white" : "border-b"
      }`}
    >
      {children}
    </li>
  );
}
function handleSignOut() {
  signOut(auth);
}
function ButtonizedButton({ link, name, children }) {
  return (
    <Link href={link}>
      <a
        className={
          "font-normal text-black  md:text-lg  normal-case flex items-center justify-center gap-2"
        }
      >
        {children}
        {name}
      </a>
    </Link>
  );
}

export default function Navbar() {
  const [user] = useAuthState(auth);
  const menuRef = useRef(null);
  function openMenu(e) {
    e.preventDefault();
    let burger = document.querySelector(".burger").classList;
    burger.toggle("nav-open");
    burger.contains("nav-open")
      ? gsap.to(menuRef.current, {
          duration: 0.5,
          opacity: 1,
          display: "block",
        })
      : gsap.to(menuRef.current, {
          duration: 0.5,
          opacity: 0,
          display: "none",
        });
  }
  return (
    <nav
      id={"navbar-container "}
      className={"flex top-0 justify-center sticky w-full glass z-10"}
    >
      <div className="navbar w-10/12 flex justify-between ">
        <div className={"h-full"}>
          <Link href={"/"}>
            <img
              alt={"logo"}
              className={"w-16 cursor-pointer"}
              src={
                "https://images.pling.com/img/00/00/47/52/98/1410012/5dde36d5540a17ac1fcfa2ef5e4f05547e858d8f40637a24d8be500f8ab4139cecbd.png"
              }
            />
          </Link>
        </div>
        <div
          className={
            "md:flex gap-4 hidden md:gap-12 text-base md:text-xl md:mx-4"
          }
        >
          <ButtonizedButton link={"/"} name={"Home"}>
            <AiFillHome />
          </ButtonizedButton>
          <ButtonizedButton link={"/products"} name={"Store"}>
            <FaStore />
          </ButtonizedButton>
        </div>
        <div className={"hidden md:flex"}>
          {user ? <NavbarUserComponent /> : <NavbarLoginComponent />}
        </div>
        <div className={"md:hidden"} id={"mobile-menu"}>
          <button className="burger" onClick={openMenu}>
            <span></span>
            <span className=""></span>
            <span></span>
          </button>
          <div
            className={"w-full hidden bg-white left-0 top-16 z-10 absolute"}
            ref={menuRef}
          >
            <ul
              className={"flex flex-col items-center justify-center "}
              id={"menu-content"}
            >
              <CustomListItem text={"Home"}>
                <Link href={"/"}>Home</Link>
              </CustomListItem>

              <CustomListItem text={"Store"}>
                <Link href={"/products"}>Store</Link>
              </CustomListItem>

              {user ? (
                <>
                  <CustomListItem text={"Cart"}>
                    <Link href={"/cart"}>Cart</Link>
                  </CustomListItem>

                  <CustomListItem text={"Signout"}>
                    <button className={"uppercase"} onClick={handleSignOut}>
                      Sign-out
                    </button>
                  </CustomListItem>
                </>
              ) : (
                <>
                  {" "}
                  <CustomListItem text={"Login"}>
                    {" "}
                    <label htmlFor="login-modal">Login</label>
                  </CustomListItem>
                  <CustomListItem text={"Signup"}>
                    <label htmlFor="register-modal">Register</label>
                  </CustomListItem>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
