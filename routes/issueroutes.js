import express from "express";
import Issue from "../models/Issue.js";

const router = express.Router();

// Get all issues (Frontend: ViewIssues.jsx)
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 }); // 💡 Added sorting by creation time
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 💡 ADD: Create a new issue (Frontend: reportissue.jsx)
router.post("/", async (req, res) => {
  const { title, description, category } = req.body;

  const newIssue = new Issue({
    title,
    description,
    category,
    // status defaults to "Pending" based on Issue.js model
  });

  try {
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    // Check for validation errors (e.g., missing required fields)
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Failed to create issue: " + error.message });
  }
});

// Delete an issue (Frontend: ViewIssues.jsx)
router.delete("/:id", async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);
    if (!issue) {
        return res.status(404).json({ message: "Issue not found" });
    }
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an issue (Frontend: ViewIssues.jsx)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // 💡 runValidators ensures model schema rules are checked
    );
    if (!updated) {
        return res.status(404).json({ message: "Issue not found" });
    }
    res.json(updated);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

export default router;