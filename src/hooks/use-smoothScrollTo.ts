import { useRef, useEffect } from "react";

const useSmoothScrollTo = (id: string) => {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const listener = (e: any) => {
      if (ref?.current && window.location?.hash === id) {
        ref?.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", listener, true);
    return () => {
      window.removeEventListener("hashchange", listener);
    };
  }, [id]);
  return {
    "data-anchor-id": id,
    ref
  };
};

export default useSmoothScrollTo;
