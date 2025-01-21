import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseDragging {
  height: number;
  setHeight: Dispatch<SetStateAction<number>>;
  maxHeight: number;
  onClose: () => void;
  turningPoint: number | undefined;
  startSpringAnimation: (height: number) => void;
  snapPoints?: number[];
}

function useDragging({
  height,
  setHeight,
  maxHeight,
  onClose,
  turningPoint,
  startSpringAnimation,
  snapPoints,
}: UseDragging) {
  const [isDragging, setIsDragging] = useState(false);
  const [handleDraggingFlag, setHandleDraggingFlag] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0); // Step 3: State to store header height

  const startYRef = useRef(0);
  const startHeightRef = useRef(0);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageY = "touches" in e ? e.touches[0].pageY : e.pageY;
    startYRef.current = pageY;
    startHeightRef.current = height;
  };

  const handleDragging = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    setHandleDraggingFlag((handleDraggingFlag: boolean) => !handleDraggingFlag);

    const pageY = "touches" in e ? e.touches[0].pageY : e.pageY;
    const delta = pageY - startYRef.current;
    const newHeight =
      startHeightRef.current - (delta / window.innerHeight) * 100;

    if (newHeight >= 0 && newHeight <= maxHeight) {
      setHeight(newHeight); // Update height during drag
    }
  };

  const handleDragStop = () => {
    if (isDragging) {
      setIsDragging(false);

      const dragDistance =
        turningPoint === undefined
          ? startHeightRef.current - height
          : turningPoint - height;

      let closestSnapPoint = 0;
      if (snapPoints?.length) {
        closestSnapPoint = snapPoints.reduce((prev, curr) =>
          Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev
        );
      }

      if (snapPoints?.length) {
        console.log(closestSnapPoint, maxHeight);

        if (closestSnapPoint > 100) {
          startSpringAnimation(maxHeight);
        } else startSpringAnimation(closestSnapPoint);
      } else if (dragDistance > 5) {
        // If the user drags downwards more than 5vh, close the sheet
        onClose();
      } else if (dragDistance < 0 && height < maxHeight) {
        // If the user drags upwards, expand to the max height
        startSpringAnimation(maxHeight);
        // setHeight(maxHeight); // Ensure the height is updated immediately
      } else if (height < startHeightRef.current) {
        // If dragging downwards but not enough to close, settle at the starting height
        startSpringAnimation(startHeightRef.current);
      }
    }
    setIsDragging(false);
  };

  useEffect(() => {
    if (dragRef.current) {
      setHeaderHeight(dragRef.current.scrollHeight); // Measure and set the header height
    }
  }, [headerHeight]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleDragging(e);
    const handleTouchMove = (e: TouchEvent) => handleDragging(e);
    const handleMouseUp = () => handleDragStop();
    const handleTouchEnd = () => handleDragStop();

    const dragRefCurrent = dragRef.current;

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      document.addEventListener("mouseup", handleMouseUp);
      dragRefCurrent?.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      dragRefCurrent?.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      dragRefCurrent?.removeEventListener("touchmove", handleTouchMove);
      dragRefCurrent?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, handleDraggingFlag]); //eslint-disable-line

  return {
    handleDragStart,
    isDragging,
    dragRef,
    headerHeight,
  };
}

export default useDragging;
