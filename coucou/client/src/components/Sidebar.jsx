import { Cross } from "lucide-react";
import React from "react";
import UserProfileCard from "./UserProfileCard";

const Sidebar = ({ isMenuOpen, setIsMenuOpen, room, users }) => {
  return (
    <div className={`${isMenuOpen ? "fixed inset-y-0 left-0 z-30 w-3/4 max-w-xs" : "hidden"} md:flex flex-col px-3 md:static md:w-1/4 bg-blue-500`}>
      <div className="w-full flex justify-between text-white py-6">
        <p className="font-bold text-lg">{room}</p>
        <Cross className="rotate-45 md:hidden" onClick={() => setIsMenuOpen(false)} />
      </div>
      <p className="font-bold">Members</p>
      {users.map((user) => (
        <UserProfileCard name={user.name} />
      ))}
    </div>
  );
};

export default Sidebar;
