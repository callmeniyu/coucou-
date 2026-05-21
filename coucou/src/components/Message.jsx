import React from "react";

const Message = ({ message }) => {
  const { message: text, sender } = message;
  const isCurrentUser = sender === "user";

  return (
    <div
      className={`w-full flex ${isCurrentUser ? "justify-end" : "justify-start"} mt-3 px-2`}
    >
      <div
        className={`max-w-[80%]  ${isCurrentUser ? "bg-blue-500" : "bg-slate-950"}  px-4 py-3 rounded-2xl text-white shadow-sm`}
      >
        <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
          {sender}
        </p>
        <p className="mt-1 text-base leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default Message;
