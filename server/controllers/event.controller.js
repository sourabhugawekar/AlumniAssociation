import Event from "../models/event.model.js";

export const postEventDetails = async (req, res) => {
  try {
    await Event.create(req.body);
  } catch (err) {
    console.log(err);
  }
};

export const getAllEventDetails = async (req, res) => {
  try {
    console.log("object");
    const data = await Event.find();
    console.log(data);
    res.status(200).json({
      message: "Events data is Send",
      data,
    });
  } catch (err) {
    console.log(err);
  }
};
