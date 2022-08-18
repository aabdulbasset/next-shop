import { gsap } from "../../utils/gsapped";
import { useEffect, useRef } from "react";

export default function () {
  const testimonialRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      testimonialRef.current,
      { y: -100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: "#testimonial",
          toggleActions: "restart reverse restart reverse",
        },
        y: 0,
        opacity: 1,
        duration: 1,
      }
    );
  }, []);

  return (
    <section
      className="glass dark:bg-gray-900 my-6 w-10/12 mx-auto "
      ref={testimonialRef}
      id={"testimonial"}
    >
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <figure className="max-w-screen-md mx-auto">
          <svg
            className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
            viewBox="0 0 24 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
              fill="currentColor"
            />
          </svg>
          <blockquote>
            <p className="text-2xl font-medium text-gray-900 dark:text-white">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              congue urna. Nulla facilisi. Fusce ornare sodales dui, maximus
              aliquam enim scelerisque at. Curabitur rutrum consequat aliquet.
              Proin sit amet vulputate nunc. Curabitur pulvinar porta turpis sed
              elementum. Fusce aliquam nisi vel magna sollicitudin, in commodo
              ipsum porta. "
            </p>
          </blockquote>
          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            <img
              className="w-6 h-6 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
              alt="profile picture"
            />
            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">
                John Doe
              </div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                CEO at lorem
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
