import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

const InputField = ({ classes = "" }) => {
  return (
    <div className={`sticky bottom-0 left-0 right-0 z-20 w-full${classes}`}>
      <div className="flex items-center gap-2 px-3 py-3">
        <Input
          className="flex-1 rounded-full py-6 px-4 border border-black bg-slate-950 placeholder:text-gray-300 placeholder:text-lg text-white text-lg"
          placeholder="Message"
        />
        <Button className="w-12 h-12 bg-slate-900 rounded-full cursor-pointer">
          <Send className="text-2xl md:text-3xl" />
        </Button>
      </div>
    </div>
  );
};

export default InputField;
