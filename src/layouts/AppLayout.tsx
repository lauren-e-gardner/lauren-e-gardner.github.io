// import { NavBar } from "../pages/components/NavBar";
import { NavBar } from "../components";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden">
      <NavBar 
        buttonProps={[
          { children: "projects", onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }) },
          { children: "skills", onClick: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
          { children: "experience", onClick: () => document.getElementById("work-experience")?.scrollIntoView({ behavior: "smooth" }) },
          { children: "education", onClick: () => document.getElementById("education")?.scrollIntoView({ behavior: "smooth" }) },
          { children: "contact", onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
        ]}
      />  
      <main>
        {children} {/* This will be the page-specific content */}
      </main>
    </div>
  );
};

export default AppLayout;
