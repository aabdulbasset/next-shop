import { endpoints } from "./endpoints";
import { toast } from "react-toastify";
export default async function updateCart(
  id,
  userId,
  token,
  action,
  quantity = 1
) {
  let data = {
    user_id: userId,
    item_id: parseInt(id),
    action: action,
    quantity: quantity,
  };

  await fetch(endpoints.updateCart, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (action === "remove") {
    toast.success("Item removed from cart");
  } else if (action === "add") {
    toast.success("Item added to cart");
  } else if (action === "delete") {
    toast.success("Item deleted from cart");
  }
}
