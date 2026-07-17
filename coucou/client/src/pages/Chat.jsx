import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/context/ToastContext";
import { Cross } from "lucide-react";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import io from "socket.io-client";

const Chat = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const socketRef = useRef(null);

  let socket;

  const ENDPOINT = import.meta.env.VITE_ENDPOINT;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const [searchParams] = useSearchParams();

  const userName = searchParams.get("name");
  const chatRoom = searchParams.get("room");
  const members = [];

  useEffect(() => {
    if (!userName || !chatRoom) {
      navigate("/");
      return;
    }
    socket = io(ENDPOINT);
    socketRef.current = socket;

    setRoom(chatRoom);
    setName(userName);

    socket.on("connect", () => {
      console.log("✅ connected:", socket.id);
      socket.emit("join", { name: userName, room: chatRoom }, (error) => {
        if (error) {
          console.error("Join error:", error);
          alert(error);
        }
      });
    });

    socket.on("previousMessages", (oldMessages) => {
      console.log("📜 loading", oldMessages, "old messages");
      setMessages(oldMessages);
    });

    socket.on("message", (message) => {
      console.log("📩 message:", message);
      setMessages((prev) => [...prev, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("connect_error", (err) => console.error("❌", err));

    // for the UI
    setName(userName);
    setRoom(chatRoom);

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [ENDPOINT, userName, chatRoom]);

  const handleClose = () => {
    showToast("Redirected to home page", "success", 3000);
    navigate("/");
  };

  const sendMessage = (event) => {
    event.preventDefault();

    const socket = socketRef.current;

    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex">
      {isMenuOpen && <div className="fixed inset-0 z-20 bg-black/40 md:hidden" onClick={() => setIsMenuOpen(false)} />}
      <Sidebar room={room} users={users} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="min-h-screen flex flex-col md:flex-row w-full">
        <div className="w-full md:flex-1 flex flex-col">
          <div className="sticky top-0 z-20 w-full flex items-center justify-between px-2 py-4 md:px-6 md:py-6 bg-slate-950 text-white text-lg font-bold">
            <div className="flex gap-2 items-center">
              <Menu className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} />
              <h1>
                Room <span className="text-yellow-300">{room}</span>
              </h1>
            </div>
            <Cross className={`rotate-45 cursor-pointer ${isMenuOpen ? "hidden md:block" : "md:block"}`} onClick={handleClose} />
          </div>
          <div className="flex-1 flex flex-col bg-gray-200">
            <div className="flex-1 overflow-hidden">
              <Messages classes="h-full" userName={userName} messages={messages} />
            </div>
            <InputField message={message} setMessage={setMessage} sendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
