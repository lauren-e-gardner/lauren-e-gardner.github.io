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
    <article className="flex flex-col gap-5 p-5 xl:p-5 2xl:p-10 rounded-3xl border border-solid  h-full w-200px">
      <div className="flex justify-between">
        <h3 className="text-xl xl:text-2xl 2xl:text-5xl font-bold">{project.title}</h3>
        <p className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-2xl">{project.date}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-2xl font-medium">{project.role}</p>
      </div>
      <div className="flex gap-2">
        {project.techIcons.map((icon, index) => (
          <img
            key={index}
            src={icon}
            alt={`Technology ${index + 1}`}
            className="h-[20px] lg:h-[34px] xl:h-[34px] 2xl:h-[50px]"
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
      <p className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-2xl leading-relaxed w-full">
        {project.description}
      </p>
      <div className="text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-2xl flex w-full gap-5 ">
        {project.demoLink && (
          <button
            onClick={() => project.demoLink && handleNavigation(project.demoLink)}
            className={`w-1/2 flex justify-center gap-2.5 px-8 py-2.5 transition-all duration-300 hover:text-[#F04F78] rounded-md border cursor-pointer ${isLinkDisabled(project.demoLink) ? 'bg-gray-400 opacity-20 text-black hover:text-black' : ''}`}
            disabled={isLinkDisabled(project.demoLink)}
          >
            Demo
          </button>
        )}
        {project.githubLink && (
          <button
            onClick={() => window.open(project.githubLink, "_blank")}
            className={`w-1/2 flex justify-center gap-2.5 px-8 py-2.5  transition-all duration-300 hover:text-[#F04F78] rounded-md border cursor-pointer ${isLinkDisabled(project.githubLink) ? 'bg-gray-400 opacity-20 text-black hover:text-black' : ''}`}
            disabled={isLinkDisabled(project.githubLink)}
          >
            <img
              src="/Logos/github_logo.png"
              alt="GitHub"
              className="h-[15px] lg:h-[20px] xl:h-[25px] 2xl:h-[35px]"
            />
            <span>GitHub</span>
          </button>
        )}
      </div>
    </article>
  );
};
