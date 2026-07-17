import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/context/ToastContext";
import { Menu, X, LogOut, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import io from "socket.io-client";

const Chat = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const socketRef = useRef(null);

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

  useEffect(() => {
    if (!userName || !chatRoom) {
      navigate("/");
      return;
    }
    const socket = io(ENDPOINT);
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
    <div className="h-screen w-full bg-[oklch(0.12_0_0)] flex overflow-hidden">
      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm animate-fade-in md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        room={room}
        users={users}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 md:px-6 md:py-4 bg-[oklch(0.16_0_0)] border-b border-white/5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200 cursor-pointer"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="hidden md:flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/40 text-sm font-medium">Room</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold text-white tracking-tight">
              <span className="md:ml-0">{room}</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs font-medium transition-all duration-200 cursor-pointer"
            >
              <Users size={14} />
              {users.length}
            </button>
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-red-400 transition-all duration-200 cursor-pointer group"
              title="Leave room"
            >
              <LogOut size={16} className="group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.12_0_0)] via-[oklch(0.14_0_0)] to-[oklch(0.12_0_0)]" />
          <div className="relative h-full">
            <Messages userName={userName} messages={messages} />
          </div>
        </div>

        {/* Input */}
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
