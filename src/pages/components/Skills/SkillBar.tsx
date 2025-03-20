interface SkillBarProps {
  name: string;
  icon: string;
  percentage: number;
}

export const SkillBar = ({ name, icon, percentage }: SkillBarProps) => {
  return (
    <div className="flex items-center gap-5">
      {/* Left-aligned container for the icon and name */}
      <div className="flex items-center gap-2.5 w-[100px] md:w-[150px] lg:w-[200px] xl:w-[200px] 2xl:w-[250px]">
        <div className="flex justify-center w-10 md:w-15 lg:w-20 xl:w-30 2xl:w-40">
          <img src={icon} alt={name} className="h-6 md:h-6 lg:h-8 xl:h-12 2xl:h-14" />
        </div>
        <p className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">{name}</p>
      </div>

      {/* Progress bar */}
      <div className="flex-1 rounded-xl border border-1 h-[17px]">
        <div
          className="h-full rounded-xl bg-[#1C1E25] dark:bg-[#E3E1DA]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Percentage text */}
      <p className="text-xs sm:text-sm md:text-md lg:text-lg font-bold w-[50px] text-[#1C1E25] dark:text-[#E3E1DA]">
        {percentage}%
      </p>
    </div>
  );
};
