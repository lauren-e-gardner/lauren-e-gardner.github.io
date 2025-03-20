import { RxAvatar } from "react-icons/rx";
// import Loading from '../pages/Loading';
import MainMenu from "./MainMenu";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  children: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
const navigate = useNavigate();
    
  const handleClick = () => {
    navigate('/skillshub/profile'); // Navigate to the /profile page
  };

  return (
    <>
      <div className="bg-black text-white py-5 text-center w-full relative mt-0 mb-0 ml-0 mr-0">
        <div className="flex justify-between items-center w-full px-5">
          <div className="flex justify-start items-center">
            <MainMenu />
          </div>
          <div className="flex justify-center items-center">
            <h3 className="text-3xl xl:text-4xl 2xl:text-6xl">
              Skills<span className="font-bold">Hub</span>
            </h3>
          </div>
          <div className="flex justify-end items-center">
            <div
              className="absolute top-5 right-5 flex items-center cursor-pointer p-2"
              onClick={handleClick}
            >
              <span className="px-2 xl:px-4 2xl:px-6 text-lg lg:text-xl xl:text-2xl 2xl:text-4xl">
                Profile
              </span> 
              <RxAvatar className=" w-6 h-6 xl:w-8 xl:h-8 2xl:w-12 2xl:h-12" />

            </div>
          </div>
        </div>
      </div>

      {/* Full-screen container */}
      <div className="bg-black text-white text-center min-w-full relative m-0 h-screen flex flex-col items-center">
        <div className="text-left min-w-[calc(100vw-50px)] max-w-[calc(100vw-50px)] min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] flex-grow border-2 border-[#17191e] rounded-xl px-0">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default NavBar;
