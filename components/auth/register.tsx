import {
  useCreateUserWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseconfig";
import { ClipLoader } from "react-spinners";
import Modal from "./card";
import { MdEmail } from "react-icons/md";
import { BsKeyFill } from "react-icons/bs";

export default function RegisterComponent() {
  const [user] = useAuthState(auth);
  const [createUserWithEmailAndPassword, loginUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  function handleRegister(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(
      document.querySelector("#register-email").value,
      document.querySelector("#register-password").value
    );
  }
  if (loading) {
    return (
      <Modal>
        <ClipLoader />
      </Modal>
    );
  } else if (user) {
    return <></>;
  } else {
    return (
      <Modal mode={"register"}>
        <form onSubmit={handleRegister}>
          <label
            htmlFor="register-email"
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
              id="register-email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johndoe@gmail.com"
            />
          </div>
          <label
            htmlFor="register-password"
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
              id="register-password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="************"
            />
          </div>
          <button
            type="submit"
            className="block mx-auto focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Register
          </button>
        </form>
      </Modal>
    );
  }
}
