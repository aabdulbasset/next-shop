import { useEffect, useState } from "react";
import { BsCheckAll } from "react-icons/bs";
import { GoX } from "react-icons/go";
import updateUserCart from "../../utils/updatecart";
import {detailsType} from '../../interfaces/index'
export default function CartItem({ item, cartFn }) {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  async function fetchProductDetails() {
    let result = await fetch(
      `https://e-store-api-clean.herokuapp.com/api/products?id=${item[0]}`
    );
    let JsonResult = await result.json();
    setDetails(JsonResult["message"]);

    setLoading(false);
  }

  function removeFromCart(e) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    delete cart[e.target.dataset.id];
    localStorage.setItem("cart", JSON.stringify(cart));
    cartFn(cart);
  }
  function updateCart(e) {
    e.preventDefault();
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[e.target.dataset.id] = parseInt(e.target.value);
    localStorage.setItem("cart", JSON.stringify(cart));
    cartFn(cart);
  }
  useEffect(() => {
    (async function () {
      await fetchProductDetails();
    })();
  }, []);
  function getSelection() {
    let elements = [];
    if (details) {
      // @ts-ignore
      for (let i = 1; i <= details.stock; i++) {
        if (i == item[1]) {
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
  if (!loading && details) {
    let cart = JSON.parse(localStorage.getItem("cart"));

    return (
      <div
        className={
          "flex flex-row h-fit py-4 border-y-2 border-gray-300 w-full mr-4"
        }
      >
        <img
          src={(details as detailsType).images[0]}
          className={"max-w-[200px] h-[200px] max object-contain"}
        />
        <div className={"flex flex-col justify-between px-4"}>
          <div>
            <h5 className={"font-bold"}>{(details as detailsType).name as string}</h5>
            <h5>{"GPU"}</h5>
            <h5 id={"cart-price"} className={"font-bold"}>
              {(details as detailsType).price as string} L.E
            </h5>
            <select
              onChange={updateCart}
              data-id={(details as detailsType).id }
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {getSelection()}
            </select>
          </div>
          <div>
            {details && (details as detailsType).stock >= cart[(details as detailsType).id] ? (
              <BsCheckAll className={"text-2xl"} />
            ) : (
              <GoX />
            )}{" "}
            {details && (details as detailsType).stock >= cart[(details as detailsType).id]
              ? " In stock"
              : "Out of stock"}
          </div>
        </div>
        <button
          className={"self-start ml-auto mr-8 btn btn-primary text-white"}
          data-id={(details as detailsType).id}
          onClick={removeFromCart}
        >
          X
        </button>
      </div>
    );
  } else {
    return <></>;
  }
}
