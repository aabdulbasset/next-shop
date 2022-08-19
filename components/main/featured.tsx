import ProductCard from "../products/card";
export default function Featured({ products }) {
  console.log(products);
  return (
    <section id={"featured-products"} className={"mt-28 w-10/12 mx-auto"}>
      <div
        id={"featured-container"}
        className={"text-center flex gap-12 flex-col"}
      >
        <h1 className={"font-bold text-4xl md:text-6xl"}>
          Featured Products
          <i className={"block text-2xl mt-4 font-normal"}>Best of the best</i>
        </h1>
        <div
          id={"cards"}
          className={
            "flex flex-col md:flex-row gap-12 items-center justify-center"
          }
        >
          {products.map((product) => (
            <ProductCard
              rating={product.rating}
              id={product.id}
              stock={product.stock}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.images[0]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
