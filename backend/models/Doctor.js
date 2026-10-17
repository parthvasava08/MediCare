import mongoose from "mongoose";
import bcrypt from "bcrypt";

const doctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    tokenVersion: { type: Number, default: 0 },

    name: { type: String, required: true, trim: true },
    specialization: { type: String, default: "" },

    imageUrl: { type: String, default: null },
    imagePublicId: { type: String, default: null },

    experience: { type: String, default: "" },
    qualifications: { type: String, default: "" },
    location: { type: String, default: "" },
    about: { type: String, default: "" },

    fee: { type: Number, default: 0 },
    availability: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },

    schedule: { type: Map, of: [String], default: {} },
    success: { type: String, default: "" },
    patients: { type: String, default: "" },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true },
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  if (!this.isNew) this.tokenVersion = (this.tokenVersion || 0) + 1;
  next();
});

doctorSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

doctorSchema.index({ name: "text", specialization: "text" });

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
