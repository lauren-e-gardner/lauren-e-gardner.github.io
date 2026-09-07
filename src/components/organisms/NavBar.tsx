import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // import hamburger icon and close icon
import { Button, ButtonProps } from "../atoms/Button/Button";

interface NavBarProps {
    buttonProps?: ButtonProps[];
}
export const NavBar: React.FC<NavBarProps> = ({ buttonProps }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state for toggling menu

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    setIsMenuOpen(!isMenuOpen)
    if (section) {
      section.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  };
  

  return (
    <nav className="fixed top-0 w-full shadow-md z-50 flex gap-1 md:gap-5 lg:gap-10 px-5 sm:px-10 md:px-20 lg:px-30 xl:px-60 py-5 text-lg justify-between items-center backdrop-blur-md">
      {/* Hamburger icon (visible on small screens) */}
      <div className="md:hidden relative z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle the menu
          className="text-2xl z-50"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Show either hamburger or close icon */}
        </button>
      </div>

      {/* Regular desktop menu */}
        {buttonProps?.map((props, index) => {
            return (
                <Button {...props} key={index} type="link"/>
            )
        })}

    </nav>
  );
};
