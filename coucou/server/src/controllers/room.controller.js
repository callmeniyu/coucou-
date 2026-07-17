import Room from "../models/room.js";
export const joinRoom = async (req, res) => {
  try {
    const { room, password } = req.body;

    const existing = await Room.findOne({ name: room });

    if (existing) {
      const ok = await existing.comparePassword(password);

      if (!ok) return res.status(401).json({ error: "Wrong password" });
      return res.status(200).json({ existing });
    } else {
      return res.status(404).json({ error: "No such room found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong while joining room" });
  }
};

export const createRoom = async (req, res) => {
  try {
    const { room, password, name } = req.body;
    const existing = await Room.findOne({ name: room });

    if (existing) return res.status(401).json({ error: "Room name is already taken" });

    const newRoom = await Room.create({ name: room, password, creator: name });
    return res.status(200).json({ newRoom });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong while creating room" });
  }
};
