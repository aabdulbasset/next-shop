import Link from "next/link";

export default function Hero() {
  return (
    <section
      id={"hero"}
      className={
        "h-[80vh] w-10/12 flex justify-center items-center mx-auto mt-6"
      }
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
            "text-white flex items-center grow flex-col gap-12 justify-center w-full h-full backdrop-blur-md"
          }
        >
          <h1 className={"text-8xl uppercase"}>Your dream starts here</h1>
          <h2 className={"text-4xl"}>
            Unlock your potential - Build your dream PC.
          </h2>
          <Link href={"/products"}>
            <button
              className={
                "btn border-none bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white btn-lg w-max font-normal"
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
