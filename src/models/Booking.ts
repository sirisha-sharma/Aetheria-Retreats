import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema(
  {
    retreat: { type: Schema.Types.ObjectId, ref: "Retreat", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    guests: { type: Number, default: 1 },
    total: { type: Number, default: 0 },
    status: { type: String, enum: ["pending", "confirmed"], default: "pending" }
  },
  { timestamps: true }
);

const Booking = models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
