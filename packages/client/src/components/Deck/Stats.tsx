import React from "react";

// TODO: Stylize Bleyle following desings in Figma
export const DeckStats: React.FC = () => {
  return (
    <div className="deck-stats relative flex items-center gap-3 shadow-lg bg-base-100 mx-6 sm:mx-12">
      <div className="badge absolute right-3 top-2">LVL 33</div>
      <div className="placeholder avatar">
        <div className="w-24 rounded-xl">
          <span className="text-xl">JO</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Energy</p>
        <progress
          className="progress progress-success"
          value="20"
          max="100"
        ></progress>
      </div>
    </div>
  );
};
