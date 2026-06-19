import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ classes, userName, messages }) => {
  return (
    <div className={`flex-1 h-full ${classes}`}>
      <ScrollToBottom className="flex-1 h-full px-2 py-3">
        {messages.map((message, i) => (
          <Message key={i} message={message} userName={userName} />
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
