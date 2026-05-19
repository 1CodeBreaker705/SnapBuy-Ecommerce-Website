import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const toggleVisibility = () => {

      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }

    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);

  }, []);

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="
          fixed
          bottom-6
          right-6
          z-50
          bg-zinc-800
          text-white
          p-2
          md:p-3
          rounded-full
          shadow-lg
          hover:scale-110
          transition-all
          duration-300
          cursor-pointer
          "
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;