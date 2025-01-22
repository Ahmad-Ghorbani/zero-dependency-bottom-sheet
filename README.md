# Zero Dependency Bottom Sheet

A lightweight, customizable React bottom sheet component with zero dependencies.

## Installation

```bash
npm install zero-dependency-bottom-sheet
```

OR

```bash
yarn add zero-dependency-bottom-sheet
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
import { BottomSheet } from "zero-dependency-bottom-sheet";

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
          </div>
        </BottomSheet.Body>
      </BottomSheet>
    </div>
  );
};

export default App;
```

## Props

## Props

| Prop                | Type              | Default     | Description                                      | Required/Optional |
| :------------------ | :---------------- | :---------- | :----------------------------------------------- | :---------------- |
| isOpen              | `boolean`         | required    | Controls the visibility of the bottom sheet      | Required          |
| onClose             | `() => void`      | required    | Callback function when bottom sheet is closed    | Required          |
| children            | `React.ReactNode` | required    | Content to be rendered inside the bottom sheet   | Required          |
| initialHeight       | `number`          | `50`        | Initial height of the bottom sheet in percentage | Optional          |
| backdropColor       | `string`          | `'#000000'` | Color of the backdrop overlay                    | Optional          |
| backdropOpacity     | `number`          | `0.5`       | Opacity of the backdrop overlay (0-1)            | Optional          |
| borderRadius        | `number`          | `20`        | Border radius of the bottom sheet in pixels      | Optional          |
| dragAreaColor       | `string`          | `'#000000'` | Color of the drag handle area                    | Optional          |
| dragIconColor       | `string`          | `'#ffffff'` | Color of the drag handle                         | Optional          |
| closeOnOverlayClick | `boolean`         | `true`      | Close the bottom sheet when overlay is clicked   | Optional          |
| snapPoints          | `number[]`        | `undefined` | Define snapping positions during dragging        | Optional          |

## License

MIT © Ahmad Ghorbani
