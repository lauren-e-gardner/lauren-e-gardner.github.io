import React, { useState, useEffect } from 'react';

interface Person {
  name: string;
  skills: string[];
  positions: string[];
  skillsCount?: number;
  positionsCount?: number;
}

const people: Person[] = [
  { name: 'Alice', skills: ['5', '2', '3', '10'], positions: ['Developer', 'Designer'] },
  { name: 'Bob', skills: ['1', '2', '3'], positions: ['Manager'] },
  { name: 'Charlie', skills: ['0', '1', '8'], positions: ['Developer'] },
  { name: 'David', skills: ['4', '5', '9', '12'], positions: ['Designer', 'Developer'] },
  { name: 'Eve', skills: ['6', '7', '8'], positions: ['Manager', 'Developer'] },
  { name: 'Frank', skills: ['2', '3', '5', '6'], positions: ['Designer'] },
  { name: 'Grace', skills: ['7', '9', '10', '11'], positions: ['Developer', 'Designer'] },
  { name: 'Helen', skills: ['2', '5', '9'], positions: ['Manager'] },
  { name: 'Ivy', skills: ['1', '4', '5', '7', '8'], positions: ['Developer', 'Manager'] },
  { name: 'Jack', skills: ['3', '5', '6', '10'], positions: ['Developer'] },
  { name: 'Kevin', skills: ['2', '4', '5', '8'], positions: ['Designer'] },
  { name: 'Lily', skills: ['1', '2', '3', '6', '9'], positions: ['Manager', 'Developer'] }
];

// const colors = {
//   white: "#EFF6F6",
//   black: "#0b0e0f",
//   gray: "#191b1f",
//   green: "#00ff00",
//   greenGray: "#192b1f"
// };

const Leaderboard: React.FC = () => {
  const [sortedUsers, setSortedUsers] = useState<Person[]>([]);

  useEffect(() => {
    const usersWithSkillAndPositionCount = people.map(user => ({
      ...user,
      skillsCount: user.skills.length,
      positionsCount: user.positions.length
    })).sort((a, b) => b.skillsCount - a.skillsCount);

    setSortedUsers(usersWithSkillAndPositionCount.slice(0, 5));
  }, []);

  return (
    <div className="p-4 xl:p-6 2xl:p-10 bg-[#0b0e0f] text-[#EFF6F6] w-[100%] h-[100%] flex flex-col overflow-y-auto rounded-lg">

<h2 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-bold text-center p-4 xl:p-6 2xl:p-10">Leaderboard</h2>
<p className="text-sm lg:text-md xl:text-lg 2xl:text-3xl text-[#EFF6F6] mb-4 xl:mb-6 2xl:mb-10">
        Check out the top-performing users based on skills learned and available positions. Stay tuned for more features!
      </p>
      
      <div className="overflow-auto bg-[#0b0e0f] rounded-lg border-2 border-[#17191e] shadow-none">
        <table className="min-w-[200px] table-auto w-full">
          <thead>
            <tr>
              <th className="text-left text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-[#EFF6F6]"></th>
              <th className="p-4 xl:p-6 2xl:p-10 text-left text-lg lg:text-xl xl:text-2xl 2xl:text-4xl text-[#EFF6F6]">
                <span className="font-bold">User</span>
              </th>
              <th className="p-4 xl:p-6 2xl:p-10 text-center text-lg lg:text-xl xl:text-2xl 2xl:text-4xl text-[#EFF6F6]">
                <span className="font-bold">Skills Learned</span>
              </th>
              <th className="p-4 xl:p-6 2xl:p-10 text-center text-lg lg:text-xl xl:text-2xl 2xl:text-4xl text-[#EFF6F6]">
                <span className="font-bold">Positions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.name} className={`${index < 1 ? 'bg-[#192b1f] text-[#00ff00]' : 'bg-[#0b0e0f] text-[#EFF6F6]'}`}>
                <td className={`text-sm lg:text-md xl:text-lg 2xl:text-3xl p-4 xl:p-6 2xl:p-8 border-b-1 ${index < 1 ? 'bg-[#192b1f] text-[#00ff00]' : 'bg-[#0b0e0f] text-[#EFF6F6]'}`}>
                  {index + 1}
                </td>
                <td className={`text-sm lg:text-md xl:text-lg 2xl:text-3xl p-4 xl:p-6 2xl:p-8 border-b-1 ${index < 1 ? 'bg-[#192b1f] text-[#00ff00]' : 'bg-[#0b0e0f] text-[#EFF6F6]'}`}>
                  {user.name}
                </td>
                <td className={`text-sm lg:text-md xl:text-lg 2xl:text-3xl text-center border-b-1 p-4 xl:p-6 2xl:p-8 ${index < 1 ? 'bg-[#192b1f] text-[#00ff00]' : 'bg-[#0b0e0f] text-[#EFF6F6]'}`}>
                  {user.skillsCount}
                </td>
                <td className={`text-sm lg:text-md xl:text-lg 2xl:text-3xl text-center border-b-1 p-4 xl:p-6 2xl:p-8 ${index < 1 ? 'bg-[#192b1f] text-[#00ff00]' : 'bg-[#0b0e0f] text-[#EFF6F6]'}`}>
                  {user.positionsCount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
};

export default Leaderboard;
