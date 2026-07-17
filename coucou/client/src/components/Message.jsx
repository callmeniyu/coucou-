import React from "react";

const Message = ({ message, userName }) => {
  const { user, text, createdAt } = message;

  const isCurrentUser = user === userName.trim().toLowerCase();
  const isAdmin = user.toLowerCase() === "admin";

  const time = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  // Admin messages (system notifications)
  if (isAdmin) {
    return (
      <div className="flex justify-center px-4 py-2">
        <div className="bg-white/[0.04] border border-white/5 rounded-full px-4 py-1.5">
          <p className="text-white/30 text-xs text-center italic">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex w-full px-4 py-0.5 ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-[75%] md:max-w-[65%] ${
          isCurrentUser ? "order-1" : "order-1"
        }`}
      >
        {/* Sender name for received messages */}
        {!isCurrentUser && (
          <p className="text-[11px] font-medium text-white/30 mb-1 ml-1">
            {user}
          </p>
        )}

        {/* Bubble */}
        <div
          className={`relative px-4 py-2.5 ${
            isCurrentUser
              ? "bg-gradient-to-br from-blue-500 to-blue-600 rounded-[18px_4px_18px_18px] shadow-lg shadow-blue-500/20"
              : "bg-white/8 rounded-[4px_18px_18px_18px] shadow-sm"
          }`}
          style={{
            background: isCurrentUser
              ? undefined
              : "linear-gradient(135deg, oklch(1 0 0 / 0.08), oklch(1 0 0 / 0.04))",
          }}
        >
          <p
            className={`text-sm md:text-base leading-relaxed ${
              isCurrentUser ? "text-white" : "text-white/85"
            }`}
          >
            {text}
          </p>
        </div>

        {/* Timestamp */}
        {time && (
          <p
            className={`text-[10px] text-white/20 mt-1 ${
              isCurrentUser ? "text-right mr-1" : "ml-1"
            }`}
          >
            {time}
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
