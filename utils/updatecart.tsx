export default function updateCart({ id, token, itemId, action }) {
  let items = JSON.parse(localStorage.getItem("cart"));
  let data = JSON.stringify({
    id,
    itemId,
    token,
    action,
  });
  fetch("https://e-store-api-clean.herokuapp.com/api/cart", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
}
