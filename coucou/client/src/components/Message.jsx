import React, { useEffect } from "react";

const Message = ({ message, userName }) => {
  const { user, text, createdAt } = message;

  const isCurrentUser = user === userName.trim().toLowerCase();

  const time = createdAt ? new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className={`w-full flex ${isCurrentUser ? "justify-end" : "justify-start"} mt-3 px-2`}>
      <div className={`max-w-[80%] ${isCurrentUser ? "bg-blue-500" : "bg-slate-950"} px-4 py-3 rounded-2xl text-white shadow-sm`}>
        <div className="flex items-center gap-2">
          <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{isCurrentUser ? userName : user}</p>
          {time && <span className="text-[10px] text-slate-400">{time}</span>}
        </div>
        <p className="mt-1 text-base leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default Message;
