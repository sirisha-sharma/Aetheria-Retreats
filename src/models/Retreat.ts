import mongoose, { Schema, models, type Types } from "mongoose";

export type RetreatData = {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  location: string;
  country: string;
  pricePerNight: number;
  durationDays: number;
  capacity: number;
  summary: string;
  heroImage: string;
  gallery: string[];
  tags: string[];
  highlights: string[];
  host: Types.ObjectId;
  status: "live" | "draft";
};

const RetreatSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    durationDays: { type: Number, required: true },
    capacity: { type: Number, default: 6 },
    summary: { type: String, default: "" },
    heroImage: { type: String, required: true },
    gallery: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    host: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["live", "draft"], default: "live" }
  },
  { timestamps: true }
);

const Retreat = models.Retreat || mongoose.model("Retreat", RetreatSchema);

export default Retreat;
