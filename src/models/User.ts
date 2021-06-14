import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [20, "Name cannot exceed 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide user's email"],
    maxlength: [40, "Email cannot exceed 40 characters"],
  },
  registeredEvents: {
    upcoming: {
      live: Array,
      onDemand: Array,
    },
    onGoing: {
      live: Array,
      onDemand: Array,
    },
    past: {
      live: Array,
      onDemand: Array,
    },
  },
  createdEvents: {
    upcoming: {
      live: Array,
      onDemand: Array,
    },
    onGoing: {
      live: Array,
      onDemand: Array,
    },
    past: {
      live: Array,
      onDemand: Array,
    },
  },
  savedEvents: {
    upcoming: {
      live: Array,
      onDemand: Array,
    },
    onGoing: {
      live: Array,
      onDemand: Array,
    },
    past: {
      live: Array,
      onDemand: Array,
    },
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
