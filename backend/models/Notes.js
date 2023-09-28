import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    requred: true,
  },
  description: {
    type: String,
    requred: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("note", NodeSchema);
