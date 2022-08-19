const base_url = "https://e-store-api-clean.herokuapp.com/api";
export const endpoints = {
  cartInfo: base_url + "/cart?user_id=",
  allProducts: base_url + "/product/all",
  productInfo: base_url + "/product?id=",
  allCategories: base_url + "/category/all",
  updateCart: base_url + "/cart",
  checkOut: base_url + "/checkout",
};
