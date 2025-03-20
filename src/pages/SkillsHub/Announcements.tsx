import React, { useState, useEffect } from 'react';

interface Announcement {
  id: number;
  title: string;
  content: string;
}

// Sample Announcement Data
const announcements: Announcement[] = [
  { id: 1, title: "New Feature Release", content: "We are excited to announce the release of new features on the platform!" },
  { id: 2, title: "Skill Challenge", content: "Join the skill challenge this month to boost your learning progress!" },
  { id: 3, title: "Maintenance Downtime", content: "Scheduled maintenance is planned for this weekend. Please plan accordingly." },
  { id: 4, title: "Holiday Notice", content: "Our offices will be closed next Friday for the holiday." },
];

const Announcements: React.FC = () => {
  const [sortedAnnouncements, setSortedAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    setSortedAnnouncements(announcements); // Assuming announcements are already sorted
  }, []);

  return (
    <div className="p-4 xl:p-6 2xl:p-10 bg-[#0b0e0f] text-[#EFF6F6] w-[100%] h-[100%] flex flex-col overflow-y-auto rounded-lg">
<h2 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl font-bold text-center p-4 xl:p-6 2xl:p-10">Announcements</h2>

      <div className="bg-[#191b1f] rounded-lg border-2 border-[#17191e] shadow-none overflow-y-auto max-h-[calc(100vh-200px)]">
        <ul className="p-0">
          {sortedAnnouncements.map((announcement) => (
            <li key={announcement.id} className="bg-[#191b1f] text-[#EFF6F6] border-b border-[#17191e] hover:bg-[#192b1f] p-4 xl:p-6 2xl:p-10">
              <h3 className="text-lg lg:text-xl xl:text-2xl 2xl:text-4xl font-bold text-[#00ff00]">{announcement.title}</h3>
              <p className="text-sm lg:text-md xl:text-lg 2xl:text-3xl">{announcement.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Announcements;
