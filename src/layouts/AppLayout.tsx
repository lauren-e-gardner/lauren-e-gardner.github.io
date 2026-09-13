import { NavBar } from "../components";
import { useDeviceType } from "../hooks/useDeviceType";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ overflowX: "clip"}}>
      <NavBar 
        buttonProps={[
          { children: "projects", onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
          { children: "skills", onClick: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
          { children: "experience", onClick: () => document.getElementById("work-experience")?.scrollIntoView({ behavior: "smooth" }) },
          { children: "education", onClick: () => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" }) },
          { children: "contact", onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
        ]}
      />  

        {children} {/* This will be the page-specific content */}

    </div>
  );
};

export default AppLayout;
