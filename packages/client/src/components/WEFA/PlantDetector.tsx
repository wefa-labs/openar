import React, { useState } from "react";

import { RC as PlantIcon } from "../../assets/icons/plant.svg";
import { useApp } from "../../hooks/app/useApp";

// import { Loader } from "../Loader";
import { PlantInfo } from "./PlantInfo";

interface PlantDetectorProps {
  onPlantDetection: (image: string | ArrayBuffer) => void;
  detecting: boolean;
  detected?: boolean;
  plantDetails?: PlantDetails | null;
}

export const PlantDetector: React.FC<PlantDetectorProps> = ({
  onPlantDetection,
  detecting,
  detected,
  plantDetails,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { isDesktop } = useApp();

  async function handleImage(file: File | null) {
    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);

    if (url) {
      setPreview(url);

      const reader = new FileReader();
      reader.onloadend = () => {
        const image = reader.result;
        if (!image) {
          console.log("No image");
          return;
        }

        onPlantDetection(image);
      };
      reader.readAsDataURL(file);
    }
  }

  // function handleRemove() {
  //   setPreview(null);
  // }

  function handleDragOver(e: React.DragEvent<HTMLLabelElement>) {
    e.stopPropagation();
    e.preventDefault();

    console.log("Item Dragged", e);
  }

  function handleDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.stopPropagation();
    e.preventDefault();

    console.log("Item Dropped", e);

    const files = e.dataTransfer.files;
    if (files.length) {
      handleImage(files[0]);
    }
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      handleImage(file);
    }
  }

  return (
    <label
      className={`relative grid aspect-square w-full cursor-pointer appearance-none place-items-center rounded-lg border-2 border-dashed border-primary transition-all focus:outline-none ${
        isDesktop ? "hover:border-yellow-600 hover:text-blue-500" : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      // onPaste={handlePaste}
      // contentEditable
      // suppressContentEditableWarning
    >
      <input
        className="hidden"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleUpload}
        disabled={detecting}
      />
      {preview ? (
        <>
          <img
            src={preview}
            alt="Selected Plant Photo"
            className="w-full rounded-lg object-cover"
          />
          {!detected && plantDetails && <PlantInfo {...plantDetails} />}
          {/* <button
            className="badge absolute right-2 top-2 z-20 bg-red-500 px-4 py-3 text-xl text-white"
            onClick={handleRemove}
          >
            &times;
          </button> */}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-1">
          <PlantIcon className="scale-125 fill-green-600" />
          <p
            className={`text-center text-2xl tracking-wide ${
              isDesktop ? "hover:text-blue-500" : ""
            }`}
          >
            {isDesktop ? "Click or Paste" : "Tap to Add"} Plant Image
          </p>
        </div>
      )}
    </label>
  );
};
