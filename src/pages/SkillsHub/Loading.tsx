import React, { useState, useEffect } from "react";

const Loading: React.FC = () => {
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setDone(true); // Change done state after 2 seconds
    }, 2000);
  }, []);

  return (
    <>
      <style>
        {`
          .bar {
            width: 20px;
            height: 40px;
            background-color: #03fc4e;
            animation: bounce 1s infinite ease-in-out;
          }

          .bar:nth-child(1) {
            animation-delay: 0s;
          }

          .bar:nth-child(2) {
            animation-delay: 0.2s;
          }

          .bar:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes bounce {
            0%, 100% {
              transform: scaleY(1);
            }
            50% {
              transform: scaleY(1.5);
            }
          }
        `}
      </style>

      <div className="flex justify-center items-center h-[calc(100vh-200px)]  w-full">
        <div className="flex justify-center items-center p-5  rounded-lg">
          {!done ? (
            <div className="flex space-x-2">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
          ) : (
            <div className="text-[#EFF6F6]">Content Loaded!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Loading;
