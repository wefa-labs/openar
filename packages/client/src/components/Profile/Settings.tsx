import { useApp } from "../../hooks/app/useApp";

interface ProfileSettingsProps {}

export const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <div className="flex flex-col gap-3 items-center pt-6">
      <div className="form-control w-full">
        <label className="shadow-lg bg-base-100 px-3 py-6 rounded-xl cursor-pointer label">
          <span className="label-text text-xl font-semibold">
            Enable Dark Mode
          </span>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-lg"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
        </label>
      </div>
      {/* <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text">Enable Explore & Play Sound</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onClick={toggleTheme}
            disabled
            checked={false}
          />
        </label>
      </div> */}
    </div>
  );
};
