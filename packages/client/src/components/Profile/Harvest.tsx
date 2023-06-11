import { useState } from "react";
import { createPortal } from "react-dom";

import { WefaBadgeCard } from "../WEFA/BadgeCard";

interface ProfileHarvestProps {
  badges: WefaBadge[];
  isDesktop: boolean;
}

export const ProfileHarvest: React.FC<ProfileHarvestProps> = ({
  badges,
  isDesktop,
}) => {
  const [openBadge, setOpenBadge] = useState<WefaBadge | null>(null);

  return (
    <>
      <ul
        className={
          isDesktop
            ? "grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-auto gap-6 pb-32 pt-6 h-full"
            : "flex flex-col overflow-scroll h-full gap-3 pb-20"
        }
        // className={`grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] px-6 sm:px-12 overflow-scroll h-full`}
      >
        {" "}
        {badges.map((badge) => (
          <WefaBadgeCard
            {...badge}
            key={badge.id}
            onClick={() => setOpenBadge(badge)}
          />
        ))}
      </ul>
      {createPortal(
        <>
          <input
            type="checkbox"
            id="badge-viewer-dialog"
            className="modal-toggle"
          />
          <label htmlFor="badge-viewer-dialog" className="modal cursor-pointer">
            <label
              className="modal-box relative flex w-full sm:max-w-sm max-w-xs flex-col gap-4 items-center"
              htmlFor=""
            >
              {openBadge && (
                <>
                  <img src={openBadge.Icon} alt={openBadge.name} />
                  <h4 className="">{openBadge.name}</h4>
                  <p>{openBadge.description}</p>
                  <div className="flex gap-3">
                    <button className="btn btn-primary">Share</button>
                    <button className="btn btn-primary">Mint</button>
                  </div>
                </>
              )}
            </label>
          </label>
        </>,
        document.body
      )}
    </>
  );
};
