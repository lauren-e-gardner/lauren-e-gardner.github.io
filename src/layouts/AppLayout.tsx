import { NavBar } from "../components";
import { CrayonDefs } from "../components/atoms/Crayon";

const NAV_LINKS = [
  { label: "projects", target: "projects" },
  { label: "skills", target: "skills" },
  { label: "work experience", target: "work-experience" },
  { label: "education", target: "education" },
  { label: "contact me", target: "contact" },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="crayon"
      style={{ position: "relative", overflowX: "clip", minHeight: "100vh" }}
    >
      {/* Rendered once for the whole page: every decorative shape below points
          at #crayon. */}
      <CrayonDefs />

      <NavBar links={NAV_LINKS} />

      {children}
    </div>
  );
};

export default AppLayout;
