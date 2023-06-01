import { useState } from "react";
import { a, useTransition } from "@react-spring/web";

import Hero from "./ProfileHero";
import { useProfile } from "../../hooks/views/useProfile";

type Tab = "profile" | "settings" | "wallet";

const tabs: Tab[] = ["profile", "settings", "wallet"];

export default function Profile() {
  const {
    address,
    name,
    avatar,
    balance,
    worlds,
    games,
    accountStatus,
    // avatarStatus,
    // nameStatus,
    onCreateWorld,
    handleWorldSubmit,
    worldFormRegister,
  } = useProfile();

  const [tab, setTab] = useState<Tab>("profile");

  const transition = useTransition(tab, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      tension: 300,
      friction: 20,
      clamp: true,
    },
  });

  return (
    <section className="flex flex-col gap-3 items-center py-12">
      <div className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-32">
          <span className="text-4xl">KK</span>
        </div>
      </div>
      <div className="tabs tabs-boxed">
        {tabs.map((name) => (
          <button
            key={name}
            className={`tab ${name === tab ? "tab-active" : ""}`}
            onClick={() => setTab(name)}
            type="button"
          >
            {name}
          </button>
        ))}
      </div>
      {transition((style, tab) => (
        <a.div style={style} className="flex-1">
          {tab === "profile" && <div>Profile</div>}
          {tab === "settings" && <div>Settings</div>}
          {tab === "wallet" && <div>Wallet</div>}
        </a.div>
      ))}

      {/* <div>
          <div>
            {avatar && <img src={avatar} alt="avatar" className="" />}
            <p>
              {name} {accountStatus}
            </p>
            <p>{address}</p>
            <p>{balance?.decimals}</p>
          </div>
          <div>
            <form
              onSubmit={handleWorldSubmit(onCreateWorld)}
              className="flex flex-col w-20"
            >
              <button type="submit">Create World</button>
              <input
                type="text"
                placeholder="World Name"
                {...worldFormRegister("name")}
              />
              <input
                type="text"
                placeholder="World Description"
                {...worldFormRegister("description")}
              />
              <input
                type="text"
                placeholder="World Image"
                {...worldFormRegister("image")}
              />
            </form>
          </div>
        </div> */}
      <ul>
        {/* {worlds.map((world) => (
            <li key={world.value.id}>{world.value.spaceCount}</li>
          ))} */}
      </ul>
      {/* <Hero /> */}
      <aside>
        <h3>Games</h3>
        <ul>
          {/* {games.map((game) => (
            <li key={game.value.id}>{game.value.turnCount}</li>
          ))} */}
        </ul>
      </aside>
    </section>
  );
}
