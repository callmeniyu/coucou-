import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircleCode } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Join.css";
import { useToast } from "@/context/ToastContext";
import { z } from "zod";

const Join = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("join");
  const [formData, setFormData] = useState({
    name: "",
    room: "",
    password: "",
  });

  const formSchema = z.object({
    name: z.string().min(5, "Name must be at least 5 characters"),
    room: z.string().min(4, "Room must be at least 4 characters"),
    password: z.string().min(6, "Room must be at least 6 characters"),
  });

  const handleSubmit = (e, tab) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        showToast(issue.message, "fail", 3000);
      });
      return;
    }

    if (tab === "join") {
      navigate(`/chat?name=${encodeURIComponent(formData.name)}&room=${encodeURIComponent(formData.room)}`);
    } else {
      showToast("Room created successfully", "success", 3000);
      navigate(`/chat?name=${encodeURIComponent(formData.name)}&room=${encodeURIComponent(formData.room)}`);
    }
  };

  return (
    <div className="join-page h-screen w-full flex justify-center md:items-center py-12 px-6">
      <div className="p-6 py-10 mt-28 md:mt-0 w-full max-w-xl max-h-max bg-gray-100 flex gap-4 flex-col justify-center rounded-lg shadow-lg border border-gray-200">
        <div className="flex gap-2 items-center">
          <MessageCircleCode className="text-yellow-400" />
          <h2 className="text-xl font-bold transition-all duration-300">{activeTab === "join" ? "Hey! Wanna Join With Your Friends?" : "Hey! Wanna Create a New Room?"}</h2>
        </div>

        <div className="flex w-full p-1 bg-gray-200 rounded-lg text-lg font-medium relative overflow-hidden h-12">
          <div
            className="absolute top-1 bottom-1 rounded-md bg-black transition-all duration-300 ease-in-out"
            style={{
              left: activeTab === "join" ? "4px" : "calc(50% + 2px)",
              width: "calc(50% - 6px)",
            }}
          />
          <button type="button" className={`w-1/2 h-full flex items-center justify-center text-sm font-bold z-10 transition-colors duration-300 cursor-pointer ${activeTab === "join" ? "text-white" : "text-gray-600 hover:text-black"}`} onClick={() => setActiveTab("join")}>
            Join Room
          </button>
          <button type="button" className={`w-1/2 h-full flex items-center justify-center text-sm font-bold z-10 transition-colors duration-300 cursor-pointer ${activeTab === "create" ? "text-white" : "text-gray-600 hover:text-black"}`} onClick={() => setActiveTab("create")}>
            Create Room
          </button>
        </div>

        <div className="w-full overflow-hidden relative">
          <div
            className="flex w-[200%] transition-transform duration-500 ease-in-out"
            style={{
              transform: activeTab === "join" ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            <form onSubmit={(e) => handleSubmit(e, "join")} className="w-1/2 flex flex-col gap-4 pr-3">
              <Input
                type="text"
                placeholder="Username"
                value={formData.name}
                className="w-full bg-gray-200 py-6 px-2 placeholder:text-lg placeholder:text-gray placeholder:font-bold border-3 border-black"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="Room ID"
                value={formData.room}
                className="w-full bg-gray-200 py-6 px-2 placeholder:text-lg placeholder:text-gray placeholder:font-bold border-3 border-black"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    room: e.target.value,
                  }))
                }
              />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                className="w-full bg-gray-200 py-6 px-2 placeholder:text-lg placeholder:text-gray placeholder:font-bold border-3 border-black"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <Button type="submit" className="w-full py-6 text-md font-bold cursor-pointer">
                Join
              </Button>
            </form>

            <form onSubmit={(e) => handleSubmit(e, "create")} className="w-1/2 flex flex-col gap-4 pl-3">
              <Input
                type="text"
                placeholder="Username"
                value={formData.name}
                className="w-full bg-gray-200 py-6 px-2 placeholder:text-lg placeholder:text-gray placeholder:font-bold border-3 border-black"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <Input
                type="text"
                placeholder="Room Name"
                value={formData.room}
                className="w-full bg-gray-200 py-6 px-2 placeholder:text-lg placeholder:text-gray placeholder:font-bold border-3 border-black"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    room: e.target.value,
                  }))
                }
              />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                className="w-full bg-gray-200 py-6 px-2 placeholder:text-lg placeholder:text-gray placeholder:font-bold border-3 border-black"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <Button type="submit" className="w-full py-6 text-md font-bold cursor-pointer">
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
