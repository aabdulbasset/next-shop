export default function updateCart({ id, token }) {
  let items = JSON.parse(localStorage.getItem("cart"));
  let data = JSON.stringify({
    id,
    items,
  });
  fetch("https://e-store-api-clean.herokuapp.com/api/cart", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
}
