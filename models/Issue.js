import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, default: "Pending" }
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;