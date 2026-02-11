import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["guest", "host"], default: "guest" },
    bio: { type: String, default: "" }
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", UserSchema);

export default User;
