import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send, ArrowUp } from "lucide-react";

const InputField = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="sticky bottom-0 left-0 right-0 z-10">
      {/* Glow line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="bg-[oklch(0.12_0_0)] px-3 py-3 md:px-5 md:py-4">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Input
              type="text"
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/20 pl-5 pr-14 h-12 md:h-13 rounded-2xl focus-visible:border-blue-400/50 focus-visible:ring-2 focus-visible:ring-blue-400/20 transition-all duration-300 text-sm md:text-base"
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
            />
          </div>
          <Button
            onClick={(e) => sendMessage(e)}
            disabled={!message.trim()}
            className="flex-shrink-0 w-12 h-12 md:w-13 md:h-13 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 disabled:from-white/10 disabled:to-white/5 disabled:text-white/20 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed group"
          >
            <ArrowUp
              size={20}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default InputField;
