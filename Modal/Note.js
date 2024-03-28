const mongoose = require("mongoose");
const NotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  linkedInProfile: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: false,
  },
  notess: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["follow_up", "no_response","on_hold","completed"],
    default: 'no_response'
  }
});

const model = mongoose.model("notes", NotesSchema);
module.exports = model;
