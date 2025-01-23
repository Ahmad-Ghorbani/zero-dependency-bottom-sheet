import useWorker from "./useWorker";
import useDirection from "./useDirection";
import useDragging from "./useDragging";
import useContentRef from "./useContentRef";

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

  const {
    handleDragStart,
    isDragging,
    dragRef,
    headerHeight,
    bottomSheetBodyRef,
  } = useDragging({
    height,
    setHeight,
    onClose,
    turningPoint,
    startSpringAnimation,
    snapPoints,
    isOpen,
    initialHeight,
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
