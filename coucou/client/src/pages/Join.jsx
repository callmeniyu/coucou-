import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircleCode, LogIn, Plus, User, Hash, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/context/ToastContext";
import { z } from "zod";

const Join = () => {
  const ENDPOINT = import.meta.env.VITE_ENDPOINT;
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

  const handleSubmit = async (e, tab) => {
    e.preventDefault();

    const result = formSchema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        showToast(issue.message, "fail", 3000);
      });
      return;
    }

    try {
      const endpoint = tab === "join" ? `${ENDPOINT}/room/joinRoom` : `${ENDPOINT}/room/createRoom`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || "Request failed", "fail", 3000);
        return;
      }

      if (tab === "create") {
        showToast("Room created successfully", "success", 3000);
      } else {
        showToast("Joined Room successfully", "success", 3000);
      }

      navigate(`/chat?name=${encodeURIComponent(formData.name)}&room=${encodeURIComponent(formData.room)}`);
    } catch (error) {
      console.log(error);
      showToast(error.message || "Network error", "fail", 3000);
    }
  };

  return (
    <div className="join-bg min-h-screen w-full flex items-center justify-center px-4 py-8">
      {/* Floating Orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="glass-strong w-full max-w-md rounded-2xl p-8 md:p-10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
            <MessageCircleCode className="text-white" size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              coucou
            </h1>
            <p className="text-sm text-white/50">Chat with friends</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="relative flex w-full p-1 bg-white/5 rounded-xl mb-8">
          <div
            className="absolute top-1 bottom-1 rounded-lg bg-white/10 backdrop-blur-md transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-sm"
            style={{
              left: activeTab === "join" ? "4px" : "calc(50% + 2px)",
              width: "calc(50% - 6px)",
            }}
          />
          <button
            type="button"
            className="relative w-1/2 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold z-10 transition-all duration-300 cursor-pointer"
            style={{
              color: activeTab === "join" ? "#fff" : "rgba(255,255,255,0.4)",
            }}
            onClick={() => setActiveTab("join")}
          >
            <LogIn size={16} />
            Join Room
          </button>
          <button
            type="button"
            className="relative w-1/2 py-2.5 flex items-center justify-center gap-2 text-sm font-semibold z-10 transition-all duration-300 cursor-pointer"
            style={{
              color: activeTab === "create" ? "#fff" : "rgba(255,255,255,0.4)",
            }}
            onClick={() => setActiveTab("create")}
          >
            <Plus size={16} />
            Create Room
          </button>
        </div>

        {/* Form Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex w-[200%] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: activeTab === "join" ? "translateX(0%)" : "translateX(-50%)",
            }}
          >
            {/* Join Form */}
            <form onSubmit={(e) => handleSubmit(e, "join")} className="w-1/2 flex flex-col gap-4 pr-2 md:pr-3">
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={formData.name}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/25 pl-10 h-12 rounded-xl focus-visible:border-blue-400/50 focus-visible:ring-2 focus-visible:ring-blue-400/20 transition-all duration-300"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="relative">
                <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Room ID"
                  value={formData.room}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/25 pl-10 h-12 rounded-xl focus-visible:border-blue-400/50 focus-visible:ring-2 focus-visible:ring-blue-400/20 transition-all duration-300"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      room: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/25 pl-10 h-12 rounded-xl focus-visible:border-blue-400/50 focus-visible:ring-2 focus-visible:ring-blue-400/20 transition-all duration-300"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 mt-1 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  Join Room
                  <ArrowRight size={16} />
                </span>
              </Button>
            </form>

            {/* Create Form */}
            <form onSubmit={(e) => handleSubmit(e, "create")} className="w-1/2 flex flex-col gap-4 pl-2 md:pl-3">
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={formData.name}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/25 pl-10 h-12 rounded-xl focus-visible:border-blue-400/50 focus-visible:ring-2 focus-visible:ring-blue-400/20 transition-all duration-300"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="relative">
                <Hash size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Room Name"
                  value={formData.room}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/25 pl-10 h-12 rounded-xl focus-visible:border-blue-400/50 focus-visible:ring-2 focus-visible:ring-blue-400/20 transition-all duration-300"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      room: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/25 pl-10 h-12 rounded-xl focus-visible:border-blue-400/50 focus-visible:ring-2 focus-visible:ring-blue-400/20 transition-all duration-300"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 mt-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  Create Room
                  <ArrowRight size={16} />
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
