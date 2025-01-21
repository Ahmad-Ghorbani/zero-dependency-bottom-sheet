# Zero Dependency Bottom Sheet

A lightweight, customizable React bottom sheet component with zero dependencies.

## Installation

```bash
npm install zero_dependency_bottom_sheet
```

OR

```bash
yarn add zero_dependency_bottom_sheet
```

## Features

🚫 Zero dependencies

📱 Responsive design

🎯 Snap points for precise positioning

🎨 Highly customizable styling

🔄 Smooth animations

📲 Touch-friendly drag gestures

## Usage

```jsx
import React, { useState } from "react";
import "./App.css";
import BottomSheet from "./BottomSheet";

const App: React.FC = () => {
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const showSheet = () => {
    setIsSheetVisible(true);
  };

  const hideSheet = () => {
    setIsSheetVisible(false);
  };

  return (
    <div className="App">
      <button className="show-btn" onClick={showSheet}>
        Show Bottom Sheet
      </button>
      <BottomSheet
        isOpen={isSheetVisible}
        onClose={hideSheet}
        initialHeight={50}
        borderRadius={20}
        backdropOpacity={0.5}
        dragAreaColor={"#000000"}
        dragIconColor={"red"}
        closeOnOverlayClick={true}
        snapPoints={[25, 120]}
      >
        <BottomSheet.Header>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              background: "blue",
            }}
          >
            This is the Header
          </div>
        </BottomSheet.Header>
        <BottomSheet.Body>
          <div style={{ background: "red", padding: "25px 60px" }}>
            <h2>Bottom Sheet Modal</h2>
            <button
              style={{ color: "black", background: "GrayText" }}
              onClick={hideSheet}
              data-testid="close-button"
            >
              Close the sheet
            </button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              quisquam rem laborum adipisci voluptate deleniti officiis alias
              minima perspiciatis, nostrum quibusdam! Doloribus nam obcaecati
              blanditiis ducimus quasi optio aliquid aspernatur.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              quisquam rem laborum adipisci voluptate deleniti officiis alias
              minima perspiciatis, nostrum quibusdam! Doloribus nam obcaecati
              blanditiis ducimus quasi optio aliquid aspernatur.
            </p>
          </div>
        </BottomSheet.Body>
      </BottomSheet>
    </div>
  );
};

export default App;
```

## Props

| Prop                | Type              | Default     | Description                                      |
| :------------------ | :---------------- | :---------- | :----------------------------------------------- |
| isOpen              | `boolean`         | required    | Controls the visibility of the bottom sheet      |
| onClose             | `() => void`      | required    | Callback function when bottom sheet is closed    |
| children            | `React.ReactNode` | required    | Content to be rendered inside the bottom sheet   |
| initialHeight       | `number`          | `50`        | Initial height of the bottom sheet in percentage |
| backdropColor       | `string`          | `'#000000'` | Color of the backdrop overlay                    |
| backdropOpacity     | `number`          | `0.5`       | Opacity of the backdrop overlay (0-1)            |
| borderRadius        | `number`          | `20`        | Border radius of the bottom sheet in pixels      |
| dragAreaColor       | `string`          | `'#000000'` | Color of the drag handle area                    |
| dragIconColor       | `string`          | `'#ffffff'` | Color of the drag handle icon                    |
| closeOnOverlayClick | `boolean`         | `true`      | Whether clicking the overlay closes the sheet    |
| snapPoints          | `number[]`        | `[]`        | Array of snap points in percentage for dragging  |

## License

MIT © Ahmad Ghorbani
