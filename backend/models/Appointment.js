import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    owner: { type: String, required: true, index: true },
    createdBy: { type: String, default: null, index: true },

    patientName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    age: { type: Number, default: null },
    gender: { type: String, default: "" },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
      index: true,
    },
    doctorName: { type: String, default: "" },
    speciality: { type: String, default: "" },

    doctorImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },

    date: { type: String, required: true },
    time: { type: String, required: true },

    fees: { type: Number, required: true, min: 0, default: 0 },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Canceled", "Rescheduled"],
      default: "Pending",
    },

    // Audit trail for who last changed the status — distinguishes "the
    // treating doctor marked this Completed" from "an admin overrode the
    // status", which matters for a hospital app where accountability for a
    // clinical record matters.
    statusUpdatedBy: {
      type: String,
      enum: ["doctor", "admin", null],
      default: null,
    },
    statusUpdatedByAdminId: { type: String, default: null },

    rescheduledTo: {
      date: { type: String },
      time: { type: String },
    },

    payment: {
      method: {
        type: String,
        enum: ["Cash", "Online"],
        default: "Cash",
      },
      status: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
      },
      amount: { type: Number, default: 0 },
      providerId: { type: String, default: "" },
      meta: { type: mongoose.Schema.Types.Mixed, default: {} },
    },

    sessionId: { type: String, default: null, index: true },

    paidAt: { type: Date, default: null },
  },
  { timestamps: true },
);

// Compound indexes matching the queries the controllers actually run.
// Single-field indexes above cover equality filters, but these queries also
// SORT, and without an index that sort happens in memory over every matching
// document - fine at hundreds of rows, slow at hundreds of thousands. Keeping
// old appointments forever is intended (medical records), so the collection
// only grows; these keep list queries fast as it does.
//  - admin list:            sort by createdAt desc
//  - doctor's own list:     filter doctorId, sort by date+time
//  - patient's own list:    filter createdBy, sort by date+time
appointmentSchema.index({ createdAt: -1 });
appointmentSchema.index({ doctorId: 1, date: 1, time: 1 });
appointmentSchema.index({ createdBy: 1, date: 1, time: 1 });

const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);

export default Appointment;
