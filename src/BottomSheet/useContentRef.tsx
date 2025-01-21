import { useEffect, useRef } from "react";

interface UseContentRef {
  height: number;
  onClose: () => void;
  headerHeight: number;
}

function useContentRef({ height, onClose, headerHeight }: UseContentRef) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (height <= 0) {
      onClose();
    }
    document.body.style.overflow = "hidden";
    if (contentRef.current) {
      contentRef.current.style.height = `calc(${height}vh + ${headerHeight}px)`;
    }
  }, [height]); //eslint-disable-line

  return { contentRef };
}

export default useContentRef;
