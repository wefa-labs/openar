import { useProfile } from "../../hooks/views/useProfile";

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

  return (
    <div className="space">
      Profile
      <section>
        <div>
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
        </div>
        <ul>
          {/* {worlds.map((world) => (
            <li key={world.value.id}>{world.value.spaceCount}</li>
          ))} */}
        </ul>
      </section>
      <aside>
        <h3>Games</h3>
        <ul>
          {/* {games.map((game) => (
            <li key={game.value.id}>{game.value.turnCount}</li>
          ))} */}
        </ul>
      </aside>
    </div>
  );
}
