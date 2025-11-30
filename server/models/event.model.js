import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    organizerName: {
      type: String,
      required: [true, "Organizer name is required"],
      trim: true,
    },
    eventLocation: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },
    eventTime: {
      type: String,
      required: [true, "Event time is required"],
    },
    eventDescription: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
    },
    eventCategory: {
      type: String,
      required: [true, "Event category is required"],
      trim: true,
    },
    registrationLink: {
      type: String,
      required: [true, "Registration link is required"],
      trim: true,
    },
    registrationDeadline: {
      type: Date,
      required: [true, "Registration deadline is required"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Add indexes for better query performance
eventSchema.index({ eventDate: 1 });
eventSchema.index({ eventCategory: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
