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
  toast.success(`Done! ${action}ed to cart`, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}
