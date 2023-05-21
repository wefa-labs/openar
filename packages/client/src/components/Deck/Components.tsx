import { a, SpringValue, Interpolation } from "@react-spring/web";
import React from "react";
import { ReactDOMAttributes } from "@use-gesture/react/dist/declarations/src/types";

import { useDevice } from "../../hooks/device/useDevice";
import { DeckCardData } from "./Card";
import { createPortal } from "react-dom";

export interface DeckSheetData extends DeckCardData {
  type: "creature" | "plant";
  canceled?: boolean;
}

export interface DeckSheetProps extends DeckSheetData, ReactDOMAttributes {
  style: {
    display: Interpolation<number, "none" | "block">;
    bottom: string;
    y: SpringValue<number>;
  };
}

interface DeckDialogProps {}

export const UserStats: React.FC = () => {
  return (
    <div className="relative flex items-center gap-3 px-3 py-2 shadow-lg">
      <div className="badge absolute right-3 top-2">LVL 33</div>
      <div className="placeholder avatar">
        <div className="w-24 rounded-xl">
          <span className="text-xl">JO</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Energy</p>
        <progress
          className="progress progress-success w-56"
          value="20"
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export const DeckSheet: React.FC<DeckSheetProps> = ({
  style,
  actions,
  image,
  name,
  type,
  canceled,
  description,
  ...attributes
}) => {
  return (
    <a.aside
      className="fixed bottom-0 left-0 right-0 z-10 mb-16 flex h-screen touch-pan-y flex-col gap-4 rounded-lg p-4 "
      style={style}
      {...attributes}
    >
      Bottom Sheet
    </a.aside>
  );
};

export const DeckDialog: React.FC<DeckDialogProps> = () => {
  const {
    name,
    authenticated,
    error,
    handleNameChange,
    handleRegister,
    handlesync,
  } = useDevice();

  return createPortal(
    <>
      <input type="checkbox" id="webauth-dialog" className="modal-toggle" />
      <label htmlFor="webauth-dialog" className="modal cursor-pointer">
        <label
          className="modal-box relative flex w-full max-w-sm flex-col gap-4"
          htmlFor=""
        >
          <input
            type="text"
            placeholder="Deck Name"
            className="input w-full"
            value={name ?? ""}
            onChange={handleNameChange}
            disabled={authenticated}
          />
          {authenticated ? (
            <p className="text-green-500">Authenticated</p>
          ) : (
            <>
              <button onClick={handleRegister} className="btn-primary btn">
                Register
              </button>
              <button onClick={handlesync} className="btn-secondary btn">
                Sync
              </button>
            </>
          )}
          {<p className="text-red-500">{error}</p>}
        </label>
      </label>
    </>,
    document.body
  );
};
