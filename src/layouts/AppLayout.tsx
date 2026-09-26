import { NavBar } from "../components";
import { CrayonDefs, PaperGrain } from "../components/atoms/Crayon";
import { MISREGISTER } from "../components/tokens/crayon";

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
      style={{ position: "relative", overflowX: "clip", minHeight: "100vh", ["--mis" as string]: `${MISREGISTER}px` }}
    >
      {/* Rendered once for the whole page: every decorative shape below points
          at #crayon, and the grain multiplies over the lot. */}
      <CrayonDefs />
      <PaperGrain />

      <NavBar links={NAV_LINKS} />

      {children}
    </div>
  );
};

export default AppLayout;
