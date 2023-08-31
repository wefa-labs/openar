import React from "react";

import { RC as EditIcon } from "../assets/icons/cards.svg";
import { RC as CloseIcon } from "../assets/icons/world.svg";

interface TextProps {
  text: string;
  editText?: string;
  canEdit?: boolean;
  onEdit?: () => void;
  onUpdate?: () => void;
  onError?: () => void;
}

export const Text: React.FC<TextProps> = ({
  text,
  editText,
  canEdit,
  onEdit,
}) => {
  const [status, setStatus] = React.useState<
    "idle" | "editing" | "updating" | "error"
  >("idle");

  return (
    <label className="swap swap-rotate relative" onClick={onEdit}>
      {status ? (
        <>
          <input
            type="text"
            placeholder="Type here"
            value={editText}
            className="input input-bordered w-full max-w-xs"
          />
          <CloseIcon
            className="w-6 h-6 absolute top-0 right-0"
            onClick={() => setStatus("idle")}
          />
        </>
      ) : (
        <>
          <h4 className="text-2xl">{text}</h4>
          {canEdit && (
            <EditIcon
              className="w-6 h-6 absolute top-0 right-0"
              onClick={() => setStatus("editing")}
            />
          )}
        </>
      )}
    </label>
  );
};
