import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "../../utils/gsapped";
export default function Hero() {
  const heroRef = useRef(null);
  const q = gsap.utils.selector(heroRef);
  useEffect(() => {
    gsap.fromTo(
      q(".text"),
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
      }
    );
  }, []);
  return (
    <section
      id={"hero"}
      className={
        "md:h-[80vh] h-[50vh] w-full flex justify-center items-center mx-auto"
      }
    >
      <div
        id={"hero-container"}
        className={
          "mx-auto h-full relative md:rounded-md w-full h-full overflow-hidden"
        }
      >
        <div
          id={"hero-text"}
          ref={heroRef}
          className={
            "text-slate-200 flex items-center grow flex-col gap-6 md:gap-12 justify-center w-full h-full backdrop-blur-xl"
          }
        >
          <h1
            className={
              "lg:text-6xl text md:text-6xl sm:text-4xl text-2xl uppercase"
            }
          >
            Your dream starts here
          </h1>
          <h2 className={"lg:text-2xl text md:text-2xl text-sm sm:text-xl"}>
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
