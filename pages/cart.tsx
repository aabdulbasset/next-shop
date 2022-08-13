import { auth } from "../utils/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useMemo, useState } from "react";
import CartItem from "../components/cart/cartitem";
import updateUserCart from "../utils/updatecart";
function PriceHeadings(text, price) {
  return (
    <div className={"flex justify-between text-xl border-b py-4"}>
      <h4>{text}</h4>
      <h4>{price}</h4>
    </div>
  );
}

export default function Cart() {
  const [isLoading, setLoading] = useState(true);
  const [user, loading, error] = useAuthState(auth);
  const [cart, setCart] = useState({});
  const [cartTotal, setCartTotal] = useState(0);
  async function fetchCart() {
    setLoading(true);
    if (user) {
      let result = await fetch(
        "https://e-store-api-clean.herokuapp.com/api/cart?id=" + user.uid,
        {
          headers: {
            Authorization: "Bearer " + (await user.getIdToken()),
          },
        }
      );
      let JsonResult = await result.json();
      localStorage.setItem(
        "cart",
        JSON.stringify(JsonResult["message"]["items"])
      );
      setCart(JsonResult["message"]["items"]);
    }
  }
  useMemo(calculateTotal, [cart]);
  function calculateTotal() {
    setCartTotal(0);
    Object.entries(cart).forEach(async (e) => {
      let result = await fetch(
        `https://e-store-api-clean.herokuapp.com/api/products?id=${e[0]}`
      );
      let JsonResult = await result.json();
      setCartTotal((prev) => prev + JsonResult["message"].price * Number(e[1]));
    });
    setLoading(false);
  }
  useEffect(() => {
    (async () => {
      if (user) {
        updateUserCart({ id: user.uid, token: await user.getIdToken() });
      }
    })();
  }, [cart]);

  useEffect(() => {
    (async function () {
      if (!localStorage.getItem("cart")) {
        await fetchCart();
      } else {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
    })();
  }, [loading]);
  if (user && !isLoading) {
    return (
      <div id={"cart-container"} className={"w-10/12 mx-auto"}>
        <h1 className={"text-5xl font-bold border-b py-4 w-full"}>
          Shopping Cart
        </h1>
        <div id={"cart-container"} className={"flex justify-between"}>
          <div id={"cart-items"} className={"flex flex-col grow"}>
            {Object.entries(cart).map((item) => {
              return <CartItem item={item} cartFn={setCart} />;
            })}
          </div>
          <div
            id={"cart-summary"}
            className={
              "rounded-md bg-white h-max shadow-md ml-4 p-12 min-w-[25vw]"
            }
          >
            <h2 className={"font-bold text-3xl"}>Order summary</h2>
            <div id={"price-details"} className={"py-4"}>
              {PriceHeadings("Subtotal", cartTotal)}
              {PriceHeadings("Shipping", 20)}
              {PriceHeadings("Tax estimate", Math.round(cartTotal * 0.14))}
            </div>
            <div className={"flex justify-between text-2xl"}>
              <h4>Order total</h4>
              <h4>{cartTotal + 20 + Math.round(cartTotal * 0.14)}</h4>
            </div>
            <button className={"w-full btn btn-primary mt-6"}>Checkout</button>
          </div>
        </div>
      </div>
    );
  } else if (loading || isLoading) {
    return <></>;
  } else {
    return <div>You are not logged in</div>;
  }
}
