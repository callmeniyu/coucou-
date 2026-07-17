import { X, Users, Hash, Dot } from "lucide-react";
import React from "react";
import UserProfileCard from "./UserProfileCard";

const Sidebar = ({ isMenuOpen, setIsMenuOpen, room, users }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-[oklch(0.16_0_0)] border-r border-white/5">
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Hash size={16} className="text-white" />
            </div>
            <h2 className="text-white font-bold text-lg truncate">{room}</h2>
          </div>
          <p className="text-white/30 text-xs ml-10">Chat room</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users size={14} className="text-white/40" />
            <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
              Members — {users.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {users.map((user, idx) => (
              <UserProfileCard key={idx} name={user.name} />
            ))}
            {users.length === 0 && (
              <p className="text-white/20 text-sm text-center py-8">No members yet</p>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-30 w-[280px] bg-[oklch(0.14_0_0)] border-r border-white/5 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                <Hash size={16} className="text-white" />
              </div>
              <h2 className="text-white font-bold text-lg truncate">{room}</h2>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all duration-200 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-white/30 text-xs">Chat room</p>
        </div>

        <div className="overflow-y-auto p-4" style={{ height: "calc(100% - 100px)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Users size={14} className="text-white/40" />
            <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
              Members — {users.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {users.map((user, idx) => (
              <UserProfileCard key={idx} name={user.name} />
            ))}
            {users.length === 0 && (
              <p className="text-white/20 text-sm text-center py-8">No members yet</p>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
