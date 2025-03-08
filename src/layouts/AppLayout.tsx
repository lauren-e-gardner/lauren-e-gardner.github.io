import { NavBar } from "../pages/components/NavBar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden">
      <NavBar />
      <main>
        {children} {/* This will be the page-specific content */}
      </main>
    </div>
  );
};

export default AppLayout;
