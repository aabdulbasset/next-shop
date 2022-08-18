import { useState, useEffect } from "react";
import ProductsSearch from "../components/products/search";
import ProductCard from "../components/products/card";
import CardSkeleton from "../components/products/skeleton";
import { endpoints } from "../utils/endpoints";

function ProductsFilter({ filters, changeFilter, loadingFn }) {
  //handle filter clicks
  function handleFilter(e) {
    function removeAllActive() {
      let children = Array.from(document.querySelector("#filters").children);
      children.forEach((child) => {
        child.classList.remove("btn-active");
      });
    }
    if (e.target.tagName == "BUTTON") {
      loadingFn(true);
      if (e.target.classList.contains("btn-active")) {
        e.target.classList.remove("btn-active");
        changeFilter(0);
      } else {
        removeAllActive();
        e.target.classList.add("btn-active");
        changeFilter(e.target.dataset.filter);
      }
    }
  }
  //filter buttons
  return (
    <div
      id={"search-filters"}
      className={"my-4 mx-auto w-10/12 flex justify-center"}
    >
      <div
        className="btn-group overflow-auto flex-nowrap "
        id={"filters"}
        onClick={handleFilter}
      >
        {filters.map((filter) => {
          return (
            <button
              className="btn bg-transparent btn-sm font-normal md:btn-md text-black hover:text-white"
              data-filter={filter.id}
            >
              {filter.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export async function getStaticProps() {
  let productsRequest = await fetch(endpoints.allProducts);
  let products = await productsRequest.json();
  let categoriesRequest = await fetch(endpoints.allCategories);
  let categories = await categoriesRequest.json();
  return {
    props: {
      products: products["message"],
      categories: categories["message"],
    },
    revalidate: 10,
  };
}
export default function ProductsPage({ products, categories }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(0);
  function startSkeleton() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }

  useEffect(() => {
    startSkeleton();
  }, [search, filter]);

  function productsSearch() {
    return products.reduce((previousValue, product) => {
      if (
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter == 0 || product["category_id"] == filter)
      ) {
        previousValue.push(
          <ProductCard
            stock={product.stock}
            name={product.name}
            price={product.price}
            image={product.images[0]}
            id={product.id}
            description={product.description}
            rating={product.rating}
          />
        );
      }
      return previousValue;
    }, []);
  }

  return (
    <div
      id={"products-container"}
      className={"h-full w-full flex flex-col items-center"}
    >
      <ProductsSearch searchFn={setSearch} loadingFn={setLoading} />
      <ProductsFilter
        filters={categories}
        changeFilter={setFilter}
        loadingFn={setLoading}
      />
      <div
        className={
          "products-cards w-10/12 p-4 my-6 flex flex-wrap gap-6 justify-center"
        }
      >
        {loading
          ? [1, 2, 3, 4].map(() => {
              return <CardSkeleton />;
            })
          : productsSearch()}
      </div>
    </div>
  );
}
