import { feed } from "../models/feedback.model.js";

export const submitFeedback = async (req, res) => {
  const { fullname, email, feedback } = req.body;
  await feed.create({
    fullname,
    email,
    feedback,
  });

  res.json("submit");
};

export const getAllFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await feed.find();

    if (feedbacks) {
      return res.status(200).json(feedbacks);
    }
  } catch (error) {
    return res.status(400).json({
      error: "NO feedbacks found in database",
    });
  }
};
