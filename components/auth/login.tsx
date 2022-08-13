import { auth } from "../../utils/firebaseconfig";
import Modal from "../auth/card";
import { MdEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";
import {
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { ClipLoader } from "react-spinners";

export default function LoginModal() {
  const [signInWithEmailAndPassword, loginUser, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [user] = useAuthState(auth);
  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(
      document.querySelector("#login-email").value,
      document.querySelector("#login-password").value
    );
  }
  if (loading) {
    return (
      <Modal>
        <ClipLoader />
      </Modal>
    );
  } else if (user) {
    console.log(user);
    return <></>;
  } else {
    return (
      <Modal mode={"login"}>
        <form onSubmit={handleLogin}>
          <label
            htmlFor="login-email"
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
              id="login-email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johndoe@gmail.com"
            />
          </div>
          <label
            htmlFor="login-password"
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
              id="login-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="************"
            />
          </div>
          <button
            type="submit"
            className="block mx-auto focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Login
          </button>
        </form>
      </Modal>
    );
  }
}
