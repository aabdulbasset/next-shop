export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
  rating,
  stock,
}) {
  function addToCart(e) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart[e.target.dataset.id]) {
      cart[e.target.dataset.id] += 1;
    } else {
      Object.assign(cart, { [e.target.dataset.id]: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return (
    <div
      className="w-full max-w-xs max-h-96 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between"
      data-id={id}
      key={id}
    >
      <img
        className="rounded-t-lg overflow-hidden mx-auto object-cover max-w-fit"
        id={"product-image"}
        src={image}
        alt="product image"
      />
      <div className="px-5 pb-5 max-w-xs">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white text-ellipsis my-4 overflow-hidden whitespace-nowrap">
          {name}
        </h5>
        <span className={"my-6 block"}>{description}</span>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${price}
          </span>
          <a
            href="#"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            data-id={id}
            onClick={addToCart}
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
}
