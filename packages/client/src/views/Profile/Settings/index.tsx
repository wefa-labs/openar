import { useTheme } from "../../../hooks/app/useTheme";

interface ProfileSettingsProps {}

// TODO: Stylize Bleyle

export const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  // TODO: add color mode toggle
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col gap-3 items-center py-12">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Set Color Mode</span>
          <span className="label-text-alt">Alt label</span>
        </label>
        <select className="select select-bordered">
          <option disabled selected>
            Pick one
          </option>
          <option>Light</option>
          <option>Dark</option>
        </select>
        <label className="label">
          <span className="label-text-alt">Alt label</span>
          <span className="label-text-alt">Alt label</span>
        </label>
      </div>
      <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text">Enable Dark Mode</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            onClick={toggleTheme}
            checked={theme === "dark"}
          />
        </label>
      </div>
      <div className="form-control w-52">
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
      </div>
    </div>
  );
};
