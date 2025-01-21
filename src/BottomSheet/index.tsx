import React from "react";
import useBottomSheet from "./useBottomSheet";
import "./styles.css";

interface BottomSheetProps {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
  initialHeight?: number;
  backdropColor?: string;
  backdropOpacity?: number;
  borderRadius?: number;
  dragAreaColor?: string;
  dragIconColor?: string;
  closeOnOverlayClick?: boolean;
  snapPoints?: number[]; // Define snapping positions during dragging
}

const BottomSheet: React.FC<BottomSheetProps> & {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode }>;
} = ({
  onClose,
  isOpen,
  children,
  initialHeight,
  backdropColor = "black",
  backdropOpacity = 0.5,
  borderRadius = 12,
  dragAreaColor = "#FFF",
  dragIconColor = "#000",
  closeOnOverlayClick = true,
  snapPoints,
}) => {
  const {
    isDragging,
    height,
    contentRef,
    handleDragStart,
    dragRef,
    bottomSheetBodyRef,
    headerHeight,
  } = useBottomSheet({
    onClose,
    isOpen,
    initialHeight,
    snapPoints,
  });

  const header = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === BottomSheet.Header
  );
  const body = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === BottomSheet.Body
  );

  const overlayComponentBuilder = (): React.ReactNode => {
    const overlayProps = {
      className: "overlay",
      style: {
        backgroundColor: backdropColor,
        opacity: isOpen ? backdropOpacity : 0,
      },
    };

    if (closeOnOverlayClick) {
      return (
        <div data-testid="overlay" {...overlayProps} onClick={onClose}></div>
      );
    }
    return <div data-testid="overlay" {...overlayProps}></div>;
  };

  if (bottomSheetBodyRef?.current) {
    bottomSheetBodyRef.current.style.height = `calc(${height}vh )`;
  }

  return (
    <div
      data-testid="bottom-sheet"
      className={`bottom-sheet ${isOpen ? "show" : ""} ${
        height >= 100 ? "fullscreen" : ""
      } ${isDragging ? "dragging" : ""}`}
    >
      {overlayComponentBuilder()}
      <div
        className="content"
        ref={contentRef}
        style={{
          borderTopLeftRadius: `${borderRadius + 1}px`,
          borderTopRightRadius: `${borderRadius + 1}px`,
        }}
      >
        <div
          ref={dragRef}
          className="header"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          style={{
            borderTopRightRadius: `${height >= 100 ? 0 : borderRadius}px`,
            borderTopLeftRadius: `${height >= 100 ? 0 : borderRadius}px`,
            backgroundColor: dragAreaColor,
          }}
        >
          <div className="drag-icon-container">
            <div className="drag-icon">
              <span style={{ backgroundColor: dragIconColor }}></span>
            </div>
          </div>
          {header}
        </div>
        <div
          style={{
            overflowY: "scroll",
            height: `calc(100vh - ${headerHeight}px)`,
          }}
          ref={bottomSheetBodyRef}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

BottomSheet.Header = ({ children }) => <>{children}</>;

BottomSheet.Body = ({ children }) => (
  <div className="bottom-sheet-body">{children}</div>
);

export default BottomSheet;
