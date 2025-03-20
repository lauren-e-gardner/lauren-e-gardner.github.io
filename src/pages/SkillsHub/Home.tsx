import React from 'react';
import Leaderboard from './Leaderboard';
import Announcements from './Announcements';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-250px)] p-4 mx-auto">
      {/* Welcome Message Section */}
      <div className="py-4 xl:py-6 2xl:py-10 flex flex-col items-center mb-4 text-center">
        <h3 className="font-bold text-[#EFF6F6] text-xl lg:text-2xl xl:text-3xl 2xl:text-6xl">
          Welcome back, Lauren!
        </h3>
      </div>

      {/* Content Section: Leaderboard and Announcements */}
      <div className="flex flex-wrap w-full gap-4 justify-center">
        {/* Left Section: Leaderboard */}
        <div className="flex-1 w-[90vw] h-[65vh] p-4 xl:p-6 2xl:p-10 m-4 overflow-y-auto bg-[#191b1f] text-[#EFF6F6] flex flex-col items-center">
          <Leaderboard />
        </div>

        {/* Right Section: Announcements */}
        <div className="flex-1 w-[90vw] h-[65vh] p-4 xl:p-6 2xl:p-10 m-4 overflow-y-auto bg-[#191b1f] text-[#EFF6F6] flex flex-col items-center">
          <Announcements />
        </div>
      </div>
    </div>

  );
};

export default Home;
