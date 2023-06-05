import { useTheme } from "../../../hooks/app/useTheme";

interface ProfileSettingsProps {}

// TODO: Stylize Bleyle

export const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  // TODO: add color mode toggle
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col gap-3 items-center py-12 px-4">
      <div className="form-control w-full">
        <label className="cursor-pointer label">
          <span className="label-text text-xl font-semibold">
            Enable Dark Mode
          </span>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-lg"
            onClick={toggleTheme}
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
