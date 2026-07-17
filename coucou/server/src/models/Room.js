import mongoose from "mongoose";
import bcrypt from "bcrypt";

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Room name is required"],
      trim: true,
      unique: true,
      minlength: 4,
      maxlength: 30,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

roomSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS) || 10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.log(error);
  }
});

roomSchema.methods.comparePassword = async function (candidate) {
  return await bcrypt.compare(candidate, this.password);
};

roomSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    return ret;
  },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
