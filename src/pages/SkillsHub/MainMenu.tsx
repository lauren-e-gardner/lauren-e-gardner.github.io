import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<string>('/skillshub');

  const handleMenuClick = () => {
    setIsMenuOpen((prevState) => !prevState); // Toggle menu visibility
  };

  const handleClose = () => {
    setIsMenuOpen(false); // Close the menu
  };

  const handleNavigation = (path: string) => {
    setActiveMenu(path); // Set the active menu item
    handleClose(); // Close the menu after navigation
    navigate(path); // Navigate to the specified path
  };

  return (
    <div>
      {/* Menu Button */}
      <button
        aria-controls={isMenuOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        onClick={handleMenuClick}
        className="absolute top-5 left-5 flex items-center cursor-pointer"
      >
        <FaBars className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12 text-[#EFF6F6]" />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div
          id="basic-menu"
          className="absolute top-16 left-5 bg-[#0b0e0f] text-[#EFF6F6] p-2 rounded-md shadow-none z-50"
        >
          <div
            className={`menu-item ${activeMenu === '/skillshub' ? 'bg-[#192b1f] text-[#00ff00]' : ''} hover:bg-[#191b1f] hover:bg-opacity-10 p-2 cursor-pointer rounded-md`}
            onClick={() => handleNavigation('/skillshub')}
          >
            Home
          </div>

          {/* <div
            className={`menu-item ${activeMenu === '#' ? 'bg-[#192b1f] text-[#00ff00]' : ''} hover:bg-[#191b1f] hover:bg-opacity-10 p-2 cursor-pointer rounded-md`}
            onClick={() => handleNavigation('#')}
          >
            Skills Matrix / User Directory
          </div> */}

          {/* <div
            className={`menu-item ${activeMenu === '#' ? 'bg-[#192b1f] text-[#00ff00]' : ''} hover:bg-[#191b1f] hover:bg-opacity-10 p-2 cursor-pointer rounded-md`}
            onClick={() => handleNavigation('#')}
          >
            Positions
          </div> */}
          <div
            className={`menu-item ${activeMenu === '/' ? 'bg-[#192b1f] text-[#00ff00]' : ''} hover:bg-[#191b1f] hover:bg-opacity-10 p-2 cursor-pointer rounded-md`}
            onClick={() => handleNavigation('/')}
            >
            Back to Portfolio
            </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
