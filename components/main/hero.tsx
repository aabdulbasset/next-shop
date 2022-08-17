import Link from "next/link";

export default function Hero() {
  return (
    <section
      id={"hero"}
      className={"h-[80vh] w-full flex justify-center items-center mx-auto"}
    >
      <div
        id={"hero-container"}
        className={
          "mx-auto h-full relative rounded-md w-full h-full overflow-hidden"
        }
      >
        <div
          id={"hero-text"}
          className={
            "text-slate-200 flex items-center grow flex-col gap-12 justify-center w-full h-full backdrop-blur-xl"
          }
        >
          <h1
            className={"lg:text-6xl md:text-6xl sm:text-4xl text-2xl uppercase"}
          >
            Your dream starts here
          </h1>
          <h2 className={"lg:text-2xl md:text-2xl text-xs sm:text-xl"}>
            Unlock your potential - Build your dream PC.
          </h2>
          <Link href={"/products"}>
            <button
              className={
                "btn border-2 border-secondary hover:border-none hover:bg-secondary bg-transparent text-white btn-lg w-max font-normal"
              }
            >
              Purchase now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
