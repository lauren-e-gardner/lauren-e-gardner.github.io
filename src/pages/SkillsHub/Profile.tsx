import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Loading from './Loading';

const ProfilePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);

  // Simulate loading for 2 seconds
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <NavBar>
            <div className="absolute inset-0 w-full h-full flex justify-center">
          {loading ? (
            <Loading />
          ) : (
            <div className="p-4 xl:p-6 2xl:p-10 text-[#EFF6F6] flex flex-col w-[100%] min-h-screen">
              <div className="flex justify-center py-4 xl:py-6 2xl:py-10 px-8 xl:px-10 2xl:px-14 w-full">
                <div className="flex flex-col sm:flex-row justify-between w-full">
                  {/* Profile Image */}
                  <div className="flex justify-center items-center w-1/3 xl:w-1/3 2xl:w-1/2 w-full">
                    <img
                      className="rounded-xl 2xl:rounded-2xl m-2 xl:m-10 2xl:m-20  object-cover w-full h-[70vh] xl:h-[70vh] 2xl:h-[75vh]"
                      src="LinkedIn1.png"
                      alt="Profile"
                    />
                  </div>

                  {/* Profile Information */}
                  <div className="w-2/3 xl:w-2/3 2xl:w-1/2 w-full pl-8 2xl:pl-16">
                    <div className=" mb-4 xl:mb-10 2xl:mb-15 text-center">
                      <h1 className="font-bold text-xl lg:text-2xl xl:text-3xl 2xl:text-6xl text-[#EFF6F6]">
                        Lauren Gardner
                      </h1>
                    </div>

                    <div className="border-t border-[#17191e]" />

                    <div className="p-4 xl:p-6 2xl:p-10">
                      {/* Role Info */}
                      <div className="flex justify-between w-full">
                        <div className="text-left text-[#EFF6F6] text-[calc(1vw+1vh)]">
                          Software Developer
                        </div>

                        <div className="text-[#00ff00] text-[calc(1.5vw+1.5vh)] ml-auto">
                          ●●●●
                        </div>
                      </div>

                      <div className="flex justify-between items-center w-full">
                        <div className="text-left text-[#EFF6F6] text-[calc(1vw+1vh)]">
                          Marketing Analyst
                        </div>

                        <div className="text-[#00ff00] text-[calc(1.5vw+1.5vh)] ml-auto">
                          ○●●●
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#17191e]" />

                    {/* About Me Section */}
                    <div className="bg-[#191b1f] p-4 xl:p-6 2xl:p-10 rounded-xl mt-8 xl:mt-10 2xl:mt-14">
                      <div className="text-white">
                        <h2 className="font-bold text-lg lg:text-xl xl:text-2xl 2xl:text-6xl mb-4 xl:mb-6 2xl:mb-10">About Me</h2>
                        <p className="text-md lg:text-lg xl:text-xl 2xl:text-4xl">
                          Hi! I'm Lauren Gardner, a passionate Software Developer with experience in
                          frontend and full-stack development, specializing in TypeScript, React, and
                          Tailwind CSS. I enjoy working on creative projects, exploring new technologies,
                          and solving problems.
                        </p>
                        <p className="mt-4 xl:mt-6 2xl:mt-10 text-md lg:text-lg xl:text-xl 2xl:text-4xl">
                          My skill set includes:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-md lg:text-lg xl:text-xl 2xl:text-4xl">
                          <li>Software Development (Level 4)</li>
                          <li>Marketing (Level 3)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </NavBar>
    </div>
  );
};

export default ProfilePage;
