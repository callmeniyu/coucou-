import InputField from "@/components/InputField";
import Messages from "@/components/Messages";
import Sidebar from "@/components/Sidebar";
import { useToast } from "@/context/ToastContext";
import { Cross } from "lucide-react";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleClose = () => {
    showToast("Redirected to home page", "success", 3000);
    navigate("/");
  };
  return (
    <div className="min-h-screen w-full bg-white flex">
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="min-h-screen flex flex-col md:flex-row w-full">
        <div className="w-full md:flex-1 flex flex-col">
          <div className="sticky top-0 z-20 w-full flex items-center justify-between px-2 py-4 md:px-6 md:py-6 bg-slate-950 text-white text-lg font-bold">
            <div className="flex gap-2 items-center">
              <Menu
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <h1>Room 1</h1>
            </div>
            <Cross
              className={`rotate-45 cursor-pointer ${isMenuOpen ? "hidden md:block" : "md:block"}`}
              onClick={handleClose}
            />
          </div>
          <div className="flex-1 flex flex-col bg-gray-200">
            <div className="flex-1 overflow-hidden">
              <Messages classes="h-full" />
            </div>
            <InputField />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
