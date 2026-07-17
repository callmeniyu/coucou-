import Room from "../models/room";
import Message from "../models/Message";

export const getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: "Room not found" });

    const messages = await Message.find({ room: roomId }).toSorted({ createdAt: 1 }).lean();

    res.json({ messages });
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = async (req, res) => {
  try {
    const { roomId } = req.params;

    const { user, text } = req.body;

    const room = await Room.findById({ room: roomId });
    if (!room) res.send(404).json({ error: "Room not found" });

    const message = await Message.create({ text, user, room: roomId });
    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
  }
};
