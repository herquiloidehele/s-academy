import { useEffect, useState } from "react";
import { getPageScrollPosition } from "@/utils/domUtils";

/**
 * Hook to detect the scroll position of the page.
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = getPageScrollPosition();
      setScrollPosition(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollPosition;
};
