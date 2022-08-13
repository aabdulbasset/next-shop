import Hero from "../components/main/hero";
import Featured from "../components/main/featured";
import Testimonial from "../components/main/testimonial";
import { useEffect } from "react";
function App() {
  let products = [
    {
      id: 1,
      name: "mouse",
      rating: 5,
      price: 500,
      description: "best mouse ever",
      images: [
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "www.youtube.com",
      ],
      stock: 200,
      category_id: "1",
      created_at: "2022-08-11T19:24:29.578Z",
    },
    {
      id: 2,
      name: "mouse v2",
      rating: 4,
      price: 1000,
      description: "best mouse ever",
      images: [
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "www.facebook.com",
      ],
      stock: 500,
      category_id: "2",
      created_at: "2022-08-11T19:25:10.138Z",
    },
  ];
  useEffect(() => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify({}));
    }
  }, []);
  return (
    <>
      <Hero />
      <Featured products={products} />
      <h1 className={"text-center mt-28 text-6xl font-bold capitalize"}>
        What people say
      </h1>
      <Testimonial />
    </>
  );
}

export default App;
