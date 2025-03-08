import { Project } from "../types";
import { useNavigate } from "react-router-dom";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleNavigation = (link: string) => {
    navigate(link);
  };

  return (
    <article className="flex flex-col gap-5 p-15 rounded-3xl border border-solid aspect-[3/4]">
      <div className="flex justify-between">
        <h3 className="text-3xl font-bold">{project.title}</h3>
        <p className="text-lg font-medium">{project.date}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">{project.role}</p>
      </div>
      <div className="flex gap-2">
        {project.techIcons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={`Technology ${index + 1}`}
            className="h-[34px]"
          />
        ))}
      </div>
      <div className="w-full aspect-[16/9] overflow-hidden rounded-xl">
        <img
          src={project.screenshot}
          alt={`${project.title} Screenshot`}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-lg leading-relaxed max-w-[435px]">
        {project.description}
      </p>
      <div className="flex gap-5 max-sm:flex-col">
        {project.demoLink && (
          <button
          onClick={() => project.demoLink && handleNavigation(project.demoLink)}
          className="flex gap-2.5 px-8 py-2.5 text-lg transition-all duration-300 hover:text-[#F04F78] rounded-md border cursor-pointer"
          >
            Demo
          </button>
        )}
        {project.githubLink && (
          <button
            onClick={() => window.open(project.githubLink, "_blank")}
            className="flex gap-2.5 px-8 py-2.5 text-lg transition-all duration-300 hover:text-[#F04F78] rounded-md border cursor-pointer dark:bg-[#E3E1DA] dark:text-[#1C1E25]"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ec31350d8b9baac46c86456f83b9173396e56b4"
              alt="GitHub"
              className="h-[25px] w-[25px]"
            />
            <span>GitHub</span>
          </button>
        )}
      </div>
    </article>
  );
};