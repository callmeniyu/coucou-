import { Dot } from "lucide-react";
import React from "react";

const AVATAR_COLORS = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-purple-600",
  "from-emerald-500 to-emerald-600",
  "from-amber-500 to-amber-600",
  "from-rose-500 to-rose-600",
  "from-cyan-500 to-cyan-600",
  "from-pink-500 to-pink-600",
  "from-indigo-500 to-indigo-600",
];

const UserProfileCard = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const colorIndex =
    name
      ? name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : 0;
  const gradient = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length];

  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 group cursor-default">
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}
      >
        <span className="text-white text-xs font-bold">{initials}</span>
      </div>

      {/* Name */}
      <span className="flex-1 text-sm font-medium text-white/70 group-hover:text-white/90 transition-colors duration-200 truncate">
        {name}
      </span>

      {/* Online indicator */}
      <div className="flex-shrink-0 relative">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80">
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
