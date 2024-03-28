const mongoose = require("mongoose");
const MailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  email: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: false,
  },
 
  
});

const model = mongoose.model("mail", MailSchema);
module.exports = model;
