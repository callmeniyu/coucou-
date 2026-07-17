import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ userName, messages }) => {
  return (
    <div className="h-full">
      <ScrollToBottom className="h-full !overflow-y-auto" followButtonClassName="!bg-white/5 !text-white/60 !hover:bg-white/10 !rounded-full">
        <div className="py-4 space-y-1">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-white/20 text-sm">No messages yet</p>
              <p className="text-white/10 text-xs mt-1">Say something to start the conversation!</p>
            </div>
          )}
          {messages.map((message, i) => (
            <Message key={i} message={message} userName={userName} />
          ))}
        </div>
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
