import { BsCheckAll } from "react-icons/bs";
import { GoX } from "react-icons/go";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebaseconfig";
import { detailsType } from "../../interfaces/index";
import removeCart from "../../utils/updatecart";

export default function CartItem({ item, cartUpdateFn }) {
  const [user] = useAuthState(auth);
  async function removeFromCart(e) {
    await removeCart(
      e.target.dataset.id,
      user.uid,
      await user.getIdToken(),
      "delete"
    );
    cartUpdateFn();
  }
  async function updateCart(e) {
    e.preventDefault();
    let action;
    if (e.target.value > item.quantity) {
      action = "add";
    } else {
      action = "remove";
    }
    await removeCart(
      e.target.dataset.id,
      user.uid,
      await user.getIdToken(),
      action,
      Math.abs(item.quantity - e.target.value)
    );
    await cartUpdateFn();

    // let cart = JSON.parse(localStorage.getItem("cart"));
    // cart[e.target.dataset.id] = parseInt(e.target.value);
    // localStorage.setItem("cart", JSON.stringify(cart));
    // cartFn(cart);
  }

  function getSelection() {
    let elements = [];
    if (item) {
      // @ts-ignore
      for (let i = 1; i <= item.stock; i++) {
        if (i == item.quantity) {
          elements.push(
            <option selected value={i}>
              {i}
            </option>
          );
        } else {
          elements.push(<option>{i}</option>);
        }
      }
    }
    return elements;
  }

  return (
    <div
      className={
        "flex flex-col md:flex-row h-fit py-4 border-y border-gray-200 w-full mr-4 bg-white"
      }
    >
      <img
        alt={`${item.name} image`}
        src={(item as detailsType).images[0]}
        className={"max-w-[200px] h-[200px] max object-contain md:m-4 m-auto"}
      />
      <div className={"flex flex-col justify-between px-4"}>
        <div>
          <h5 className={"font-bold"}>
            {(item as detailsType).name as string}
          </h5>
          <h5>{"GPU"}</h5>
          <h5 id={"cart-price"} className={"font-bold"}>
            {(item as detailsType).price as string} L.E
          </h5>
          <select
            onChange={updateCart}
            data-id={(item as detailsType).id}
            id="countries"
            className="w-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {getSelection()}
          </select>
        </div>
        <div>
          {/*{item &&*/}
          {/*(item as detailsType).stock >= cart[(item as detailsType).id] ? (*/}
          {/*  <BsCheckAll className={"text-2xl"} />*/}
          {/*) : (*/}
          {/*  <GoX />*/}
          {/*)}{" "}*/}
          {/*{item && (item as detailsType).stock >= cart[(item as detailsType).id]*/}
          {/*  ? " In stock"*/}
          {/*  : "Out of stock"}*/}
        </div>
      </div>
      <button
        className={"self-start ml-auto mr-8 btn btn-primary text-white"}
        data-id={(item as detailsType).id}
        onClick={removeFromCart}
      >
        X
      </button>
    </div>
  );
}
