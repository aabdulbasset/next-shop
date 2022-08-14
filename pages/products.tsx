import { useState, useEffect, useMemo } from "react";
import ProductsSearch from "../components/products/search";
import ProductCard from "../components/products/card";
import CardSkeleton from "../components/products/skeleton";

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

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(0);
  function startSkeleton() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }

  async function fetchProducts() {
    startSkeleton();
    const result = await fetch(
      "https://e-store-api-clean.herokuapp.com/api/products/all"
    );
    const JsonResult = await result.json();
    setProducts(JsonResult["message"]);
  }
  async function fetchCategories() {
    const result = await fetch(
      "https://e-store-api-clean.herokuapp.com/api/category/all"
    );
    const JsonResult = await result.json();
    setCategories(JsonResult["message"]);
  }

  useEffect(() => {
    (async function () {
      await fetchProducts();
      await fetchCategories();
    })();
  }, []);
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
          "products-cards w-10/12 flex flex-0 flex-wrap gap-6 justify-center"
        }
      >
        {loading ? [1,2,3,4].map(letter=>{
          return <CardSkeleton />
        }) : productsSearch()}
      </div>
    </div>
  );
}
