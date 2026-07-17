import Room from "../models/room.js";

const users = [];

export const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!name || !room) return { error: "Username and Room required" };

  const existingUser = users.find((user) => user.room === room && user.name === name);
  if (existingUser) return { error: "Username is taken" };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

export const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export const getUser = (id) => users.find((user) => user.id === id);

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};
