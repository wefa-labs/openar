import React from "react";

import SunIcon from "../../assets/badges/sun-100.png";

export const DeckStats: React.FC = () => {
  return (
    <div className="deck-stats flex items-center gap-3 px-3 py-2 rounded-xl w-full">
      {/* <div className="badge absolute right-3 top-2">LVL 33</div> */}
      <div className="placeholder avatar">
        <div className="w-24 rounded-xl ">
          {/* <span className="text-xl">JO</span> */}
          <img src={SunIcon} alt="deck image" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-bold">Wefadex</p>
        <div className="flex items-center gap-2">
          <p>Energy</p>
          <progress
            className="progress progress-success w-32"
            value="72"
            max="100"
          ></progress>
        </div>
      </div>
    </div>
  );
};
