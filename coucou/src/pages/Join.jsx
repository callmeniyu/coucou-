import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircleCode } from "lucide-react";
import { Link } from "react-router-dom";

const Join = () => {
  return (
    <div className="bg-primary h-screen w-full flex justify-center  md:items-center py-12 px-6">
      <div className="p-6 py-10 mt-28 md:mt-0 max-w-xl max-h-max bg-gray-100 flex gap-4 flex-col justify-center rounded-lg">
        <div className="flex gap-2 ">
          <MessageCircleCode className="text-yellow-400" />
          <h2 className="text-xl font-bold">
            Hey! Wanna Join With Your Friends?
          </h2>
        </div>
        <Input
          type="text"
          placeholder="Username"
          className="w-full bg-gray-200 py-6 px-2 placeholder:text-lg placeholder:text-gray placeholder:font-bold border-3 border-black"
        />
        <Input
          type="text"
          placeholder="Room"
          className="w-full bg-gray-200 py-6 px-2 placeholder:text-lg placeholder:text-gray placeholder:font-bold border-3 border-black"
        />
        <Link to={"/chat"} className="block cursor-pointer">
          <Button className="w-full py-6 text-md font-bold">Join</Button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
