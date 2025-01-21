import useWorker from "./useWorker";
import useDirection from "./useDirection";
import useDragging from "./useDragging";
import useContentRef from "./useContentRef";
import useInitialHeight from "./useInitialHeight";

interface UseBottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  initialHeight?: number;
  snapPoints?: number[];
}

function useBottomSheet({
  onClose,
  isOpen,
  initialHeight,
  snapPoints,
}: UseBottomSheetProps) {
  const { height, setHeight, startSpringAnimation } = useWorker();

  const { turningPoint } = useDirection({ height });

  const { maxHeight, bottomSheetBodyRef } = useInitialHeight({
    isOpen,
    initialHeight,
    setHeight,
    startSpringAnimation,
  });

  const { handleDragStart, isDragging, dragRef, headerHeight } = useDragging({
    height,
    setHeight,
    maxHeight,
    onClose,
    turningPoint,
    startSpringAnimation,
    snapPoints,
  });

  const { contentRef } = useContentRef({ headerHeight, height, onClose });

  return {
    isDragging,
    height,
    contentRef,
    handleDragStart,
    dragRef,
    bottomSheetBodyRef,
    headerHeight,
  };
}

export default useBottomSheet;
