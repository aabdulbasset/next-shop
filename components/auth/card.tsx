import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseconfig";
import { ClipLoader } from "react-spinners";
import { MdEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";

export default function Modal({ children, mode }) {
  function AuthComponent() {
    if (loginLoading || registerLoading) {
      return <ClipLoader />;
    } else if (user) {
      console.log(user);
      return <></>;
    } else {
      return (
        <form onSubmit={mode == "login" ? handleLogin : handleRegister}>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your Email
          </label>
          <div className="relative mb-6">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <MdEmail />
            </div>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johndoe@gmail.com"
            />
          </div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your Password
          </label>
          <div className="relative mb-6">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <BsKeyFill />
            </div>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="************"
            />
          </div>
          <button
            type="submit"
            className="block mx-auto focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            {mode == "login" ? "Login" : "Register"}
          </button>
          <h1 className={"text-error text-center border-t py-2"}>
            {registerError || loginError ? "Error occurred" : ""}
          </h1>
        </form>
      );
    }
  }

  const [user] = useAuthState(auth);
  async function handleRegister(e) {
    e.preventDefault();
    await createUserWithEmailAndPassword(
      (document.querySelector("#email") as HTMLInputElement).value,
      (document.querySelector("#password") as HTMLInputElement).value
    );
  }
  async function handleLogin(e) {
    e.preventDefault();
    let username = document.querySelector("#email") as HTMLInputElement;
    let password = document.querySelector("#password") as HTMLInputElement;
    await signInWithEmailAndPassword(username.value, password.value);
  }
  const [signInWithEmailAndPassword, loginUser, loginLoading, loginError] =
    useSignInWithEmailAndPassword(auth);
  const [
    createUserWithEmailAndPassword,
    registerUser,
    registerLoading,
    registerError,
  ] = useCreateUserWithEmailAndPassword(auth);
  return (
    <>
      <input
        type="checkbox"
        id={mode == "register" ? "register-modal" : "login-modal"}
        className="modal-toggle"
      />
      <label
        htmlFor={mode == "register" ? "register-modal" : "login-modal"}
        className="modal cursor-pointer"
      >
        <label className="modal-box relative w-max" htmlFor="">
          <AuthComponent />
        </label>
      </label>
    </>
  );
}
