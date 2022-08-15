import Hero from "../components/main/hero";
import Featured from "../components/main/featured";
import Testimonial from "../components/main/testimonial";
import { useEffect, useState } from "react";
import { endpoints } from "../utils/endpoints";
function App() {
  const [products, setProducts] = useState([]);
  async function fetchProducts() {
    const result = await fetch(endpoints.allProducts + "?limit=3&sort=asc");
    const JsonResult = await result.json();
    setProducts(JsonResult["message"]);
  }
  useEffect(() => {
    (async function () {
      await fetchProducts();
    })();
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
