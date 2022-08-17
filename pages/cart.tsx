import { auth } from "../utils/firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import CartItem from "../components/cart/cartitem";
import ScaleLoader from "react-spinners/ScaleLoader";
import { endpoints } from "../utils/endpoints";
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
  const [user, loading] = useAuthState(auth);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  async function fetchCart() {
    setLoading(true);
    if (user) {
      let result = await fetch(endpoints.cartInfo + user.uid, {
        headers: {
          Authorization: "Bearer " + (await user.getIdToken()),
        },
      });
      result.json().then((jsonResult) => {
        console.log(jsonResult["message"]);
        setCart(jsonResult["message"]);
        setLoading(false);
      });
    }
  }

  function calculateTotal() {
    if (cart && cart.length >= 0) {
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
      setCartTotal(total);
    }
  }
  useEffect(() => {
    calculateTotal();
    // (async () => {
    //   if (user) {
    //     updateUserCart({ id: user.uid, token: await user.getIdToken() });
    //   }
    // })();
  }, [cart]);

  useEffect(() => {
    (async function () {
      await fetchCart();
    })();
  }, [user]);

  if (user && !isLoading) {
    return (
      <div id={"cart-container"} className={"w-10/12 mx-auto"}>
        <h1 className={"text-5xl font-bold border-b py-4 w-full"}>
          Shopping Cart
        </h1>
        <div
          id={"cart-container"}
          className={"flex justify-between md:flex-row flex-col gap-6"}
        >
          {cart.length > 0 ? (
            <>
              <div
                id={"cart-items"}
                className={
                  "flex flex-col grow rounded-md overflow-hidden shadow-md h-max"
                }
              >
                {cart.map((item) => {
                  return <CartItem item={item} cartUpdateFn={fetchCart} />;
                })}
              </div>
              <div
                id={"cart-summary"}
                className={
                  "rounded-md bg-white h-max shadow-md md:ml-4 p-12 min-w-[25vw]"
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
                <button className={"w-full btn btn-primary mt-6"}>
                  Checkout
                </button>
              </div>
            </>
          ) : (
            <div className={"m-auto text-5xl"}>Empty cart :(</div>
          )}
        </div>
      </div>
    );
  } else if (loading || isLoading || cart.length == 0) {
    return (
      <div className={"m-auto"}>
        <ScaleLoader />
      </div>
    );
  } else {
    return <div>You are not logged in</div>;
  }
}
