import React from "react";
import { createPortal } from "react-dom";
import { BottomSheet } from "react-spring-bottom-sheet";

import { DeckCardData } from "./Card";
import useDeviceDetect from "../../hooks/app/useDeviceDetect";

export interface DeckViewerData extends DeckCardData {
  type: "creature" | "plant";
}

export interface DeckViewerProps extends DeckViewerData {
  open: boolean;
  onDismiss: () => void;
}

// TODO: Stylize Bleyle following desings in Figma
export const DeckViewer: React.FC<DeckViewerProps> = ({
  name,
  description,
  image,
  type,
  actions,
  open,
  onDismiss,
}) => {
  const { isDesktop } = useDeviceDetect();

  const Content = () => (
    <>
      <div>{image}</div>
      <h2>{name}</h2>
      <p>{description}</p>
      <div>{type}</div>
      <div>{actions.length}</div>
    </>
  );

  if (isDesktop) {
    return createPortal(
      <>
        <input
          type="checkbox"
          id="deck-viewer-dialog"
          className="modal-toggle"
        />
        <label htmlFor="deck-viewer-dialog" className="modal cursor-pointer">
          <label
            className="modal-box relative flex w-full max-w-sm flex-col gap-4"
            htmlFor=""
          >
            <Content />
          </label>
        </label>
      </>,
      document.body
    );
  }

  return (
    <BottomSheet
      // className="fixed bottom-0 left-0 right-0 z-10 mb-16 flex h-screen touch-pan-y flex-col gap-4 rounded-lg p-4 "
      // style={style}
      className="z-20 fixed bottom=0"
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ minHeight }) => minHeight}
    >
      <Content />
    </BottomSheet>
  );
};
