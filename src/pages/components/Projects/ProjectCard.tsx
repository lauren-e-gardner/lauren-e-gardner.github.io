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

  const isLinkDisabled = (link: string) => link === '#';

  return (
    <article className="flex flex-col gap-5 xl:p-5 2xl:p-5 rounded-3xl border border-solid aspect-[3/4] h-full w-200px">
      <div className="flex justify-between">
        <h3 className="text-2xl xl:text-2xl 2xl:text-3xl font-bold">{project.title}</h3>
        <p className="text-lg 2xl:text-sm">{project.date}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg 2xl:text-md font-medium">{project.role}</p>
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
      <p className="text-lg 2xl:text-md leading-relaxed max-w-[435px]">
        {project.description}
      </p>
      <div className="flex w-full gap-5 max-sm:flex-col">
        {project.demoLink && (
          <button
            onClick={() => project.demoLink && handleNavigation(project.demoLink)}
            className={`w-1/2 flex justify-center gap-2.5 px-8 py-2.5 text-lg transition-all duration-300 hover:text-[#F04F78] rounded-md border cursor-pointer ${isLinkDisabled(project.demoLink) ? 'bg-gray-400 opacity-20 text-black hover:text-black' : ''}`}
            disabled={isLinkDisabled(project.demoLink)}
          >
            Demo
          </button>
        )}
        {project.githubLink && (
          <button
            onClick={() => window.open(project.githubLink, "_blank")}
            className={`w-1/2 flex justify-center gap-2.5 px-8 py-2.5 text-lg transition-all duration-300 hover:text-[#F04F78] rounded-md border cursor-pointer ${isLinkDisabled(project.githubLink) ? 'bg-gray-400 opacity-20 text-black hover:text-black' : ''}`}
            disabled={isLinkDisabled(project.githubLink)}
          >
            <img
              src="/Logos/github_logo.png"
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
