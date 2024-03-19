# @ilz5753/rn-modal

This package provides a customizable modal component for React Native applications.

## Installation

To install the component:

```bash
npm i @ilz5753/rn-modal
# yarn
yarn add @ilz5753/rn-modal
# bun
bun add @ilz5753/rn-modal
```

## Usage

```tsx
import React from "react";
import Modal, { ModalRef } from "@ilz5753/rn-modal";

// Usage example
const MyComponent = () => {
  let ref = React.useRef<ModalRef>(null);
  // open modal using `ref.current?.open()`
  return (
    <Modal
      ref={ref}
      duration={300}
      backdrop="#00000080"
      bg="#FFFFFF"
      borderRadius={10}
      dismisable={true}
      isBackdropLight={false}
      isLightMode={true}
      innerPadding={20}
      outerPadding={20}
      topOffset={50}
      topInset={20}
      bottomInset={20}
    >
      {/* Your modal content goes here */}
    </Modal>
  );
};

export default MyComponent;
```

## Props

- `duration` (optional): Duration of modal animation.
- `backdrop` (optional): Background color of the backdrop.
- `bg` (optional): Background color of the modal.
- `borderRadius` (optional): Border radius of the modal.
- `dismisable` (optional): Whether the modal can be dismissed by tapping outside.
- `isBackdropLight` (optional): Indicates if the backdrop color in a light appearance.
- `isLightMode` (optional): Indicates if the modal is in light mode.
- `innerPadding` (optional): Inner padding of the modal content.
- `outerPadding` (optional): Outer padding of the modal.
- `topOffset` (optional): Top offset of the modal.
- `topInset` (optional): Top inset of the modal.
- `bottomInset` (optional): Bottom inset of the modal.

## Notes

All functionalities and configurations are self-explanatory from the provided code. Simply adjust the props according to your requirements to customize the modal component as needed.

## License

`Modal` is licensed under the MIT License. See the [LICENSE](/LICENSE) file for more details.
