import React from "react";

import { useAuthWeb3 } from "../../hooks/useWeb3";
// import useDeviceDetect from "../../hooks/device/useDeviceDetect";

import { Portal } from "../Portal";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { error, address, authenticate, handleDisconnect } = useAuthWeb3();

  return (
    <header className="navbar bg-transparent">
      <div className="navbar-start">
        <a href="/" className="">
          <img
            src="/logo.svg"
            alt="WEFA Logo"
            className="dark:invert"
            width={100}
            height={24}
          />
        </a>
      </div>
      <div className="navbar-end">
        {address ? (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <label htmlFor="profile-dialog">
                  Profile
                  <span className="badge">New</span>
                </label>
              </li>
              <li onClick={handleDisconnect}>
                <a>Logout</a>
              </li>
              {error && <li className="text-red-500">{error}</li>}
            </ul>
          </div>
        ) : (
          <button onClick={authenticate} className="btn-primary btn">
            Connect
          </button>
        )}
      </div>
      <Portal>
        <input type="checkbox" id="profile-dialog" className="modal-toggle" />
        <label htmlFor="profile-dialog" className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            Profile, Preferences and Settings
          </label>
        </label>
      </Portal>
    </header>
  );
};
