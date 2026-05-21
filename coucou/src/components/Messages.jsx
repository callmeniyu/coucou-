import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";

const data = [
  {
    id: 1,
    Name: "abc",
    message: "Hello World",
    sender: "admin",
  },
  {
    id: 2,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "user",
  },
  {
    id: 3,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "user",
  },
  {
    id: 13,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "admin",
  },
  {
    id: 4,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "admin",
  },
  {
    id: 5,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "user",
  },
  {
    id: 12,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "admin",
  },
  {
    id: 6,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "user",
  },
  {
    id: 7,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "user",
  },
  {
    id: 10,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "user",
  },
  {
    id: 8,
    Name: "gigigg",
    message: "Hello Sudaaan",
    sender: "user",
  },
];

const Messages = ({ classes }) => {
  return (
    <div className={`flex-1 h-full ${classes}`}>
      <ScrollToBottom className="flex-1 h-full px-2 py-3">
        {data.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </ScrollToBottom>
    </div>
  );
};

export default Messages;
