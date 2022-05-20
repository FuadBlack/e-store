import React, { useEffect, useRef } from "react";

export const ScrollTop = () => {
  const scrollRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 900 ||
        document.documentElement.scrollTop > 900
      ) {
        scrollRef.current.classList.add("active");
      } else {
        scrollRef.current.classList.remove("active");
      }
    });
    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div>
      <div
        ref={scrollRef}
        className="scrollTop"
        onClick={() => window.scrollTo(0, 0)}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </div>
    </div>
  );
};
