import Hero from "../components/main/hero";
import Featured from "../components/main/featured";
import Testimonial from "../components/main/testimonial";

import { endpoints } from "../utils/endpoints";
function App({ products }) {
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
export async function getStaticProps() {
  let productsRequest = await fetch(
    endpoints.allProducts + "?limit=3&sort=asc"
  );
  let products = await productsRequest.json();
  return {
    props: {
      products: products["message"],
    },
    revalidate: 10,
  };
}
export default App;
