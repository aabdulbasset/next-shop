export default function Modal({ children, mode }) {
  if (mode == "register") {
    return (
      <>
        <input type="checkbox" id="register-modal" className="modal-toggle" />
        <label htmlFor="register-modal" className="modal cursor-pointer">
          <label className="modal-box relative w-max" htmlFor="">
            {children}
          </label>
        </label>
      </>
    );
  } else {
    return (
      <>
        <input type="checkbox" id="login-modal" className="modal-toggle" />
        <label htmlFor="login-modal" className="modal cursor-pointer">
          <label className="modal-box relative w-max" htmlFor="">
            {children}
          </label>
        </label>
      </>
    );
  }
}
