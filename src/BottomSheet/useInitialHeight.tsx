import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface UseInitialHeight {
  isOpen: boolean;
  initialHeight: number | undefined;
  setHeight: Dispatch<SetStateAction<number>>;
  startSpringAnimation: (value: number) => void;
}

function useInitialHeight({
  isOpen,
  initialHeight,
  setHeight,
  startSpringAnimation,
}: UseInitialHeight) {
  const [maxHeight, setMaxHeight] = useState(100);
  const [isMobile, setIsMobile] = useState(false);

  const bottomSheetBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      setIsMobile(true);
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  useEffect(() => {
    if (bottomSheetBodyRef.current && isOpen) {
      const elementHeightInPx = bottomSheetBodyRef.current.scrollHeight;
      const viewportHeightInPx = window.innerHeight;
      const heightInVh = (elementHeightInPx / viewportHeightInPx) * 100;

      let maxAllowedHeight;

      if (isMobile) {
        maxAllowedHeight = heightInVh >= 100 ? 85 : heightInVh;
      } else {
        maxAllowedHeight = heightInVh >= 100 ? 100 : heightInVh;
      }

      setMaxHeight(maxAllowedHeight); // Set the max height

      // Use initialHeight if provided, otherwise use maxAllowedHeight
      const initialSheetHeight =
        initialHeight && initialHeight <= maxAllowedHeight
          ? initialHeight
          : maxAllowedHeight;

      setHeight(initialSheetHeight);

      // Set up scrolling based on initial height and content height
      bottomSheetBodyRef.current.style.height = `${initialSheetHeight}vh`;

      startSpringAnimation(initialSheetHeight);

      // Optional: Force reflow to ensure DOM updates correctly
      setTimeout(() => {
        bottomSheetBodyRef.current?.scrollTo(0, 0); // Scroll to top just in case
      }, 50);
    }

    if (!isOpen) {
      startSpringAnimation(0);
    }
  }, [isOpen, initialHeight]); //eslint-disable-line
  return { maxHeight, bottomSheetBodyRef };
}

export default useInitialHeight;
