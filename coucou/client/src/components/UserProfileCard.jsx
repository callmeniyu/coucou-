import { DotIcon } from "lucide-react";
import React from "react";

const UserProfileCard = ({ name }) => {
  return (
    <div className="flex p-3 mt-2 justify-between flex-1 bg-slate-950 rounded-lg max-h-max text-white">
      <p>{name}</p>
      <DotIcon className="text-green-500" />
    </div>
  );
};

export default UserProfileCard;
