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
  // actions,
  element,
  open,
  onDismiss,
}) => {
  const { isDesktop } = useDeviceDetect();

  const Content = () => (
    <div className="px-4 flex flex-col gap-3 pb-12">
      <img
        src={image}
        alt={name}
        className="w-full aspect-square object-cover"
      />
      <h2 className="font-bold text-2xl">{name}</h2>
      <p className="font-light">{description}</p>
      <div>
        <div className="badge badge-lg capitalize">{type}</div>
        {}
      </div>
    </div>
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
      className="z-20 fixed min-h-5/6"
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ minHeight }) => minHeight}
    >
      <Content />
    </BottomSheet>
  );
};
