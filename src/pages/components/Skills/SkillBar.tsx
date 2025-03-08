interface SkillBarProps {
  name: string;
  icon: string;
  percentage: number;
}

export const SkillBar = ({ name, icon, percentage }: SkillBarProps) => {
  return (
    <div className="flex items-center gap-5">
      {/* Left-aligned container for the icon and name */}
      <div className="flex items-center gap-2.5 w-[200px]">
        <div className="flex justify-center w-20">
          <img src={icon} alt={name} className="h-8" />
        </div>
        <p className="text-lg">{name}</p>
      </div>

      {/* Progress bar */}
      <div className="flex-1 rounded-xl border border-1 h-[17px]">
        <div
          className="h-full rounded-xl bg-[#1C1E25] dark:bg-[#E3E1DA]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Percentage text */}
      <p className="text-lg font-bold w-[50px] text-[#1C1E25] dark:text-[#E3E1DA]">
        {percentage}%
      </p>
    </div>
  );
};
