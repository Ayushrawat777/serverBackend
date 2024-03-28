const express = require("express");
const router = express.Router();
const fetchuser = require("../midddleware/fetchuser");
const Note = require("../Modal/Note");
const  Mail= require("../Modal/mail")
const { emailProcessor } = require("../helpers/email.helper");

//ROUTE 1 : Get login user Details using
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes); 
    console.log(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 2 : Get login user Details using
router.post("/addnote", fetchuser, async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      linkedInProfile,
      company,
      position,
      notess,
      status
    } = req.body;

    const note = new Note({
      name,
      email,
      phoneNumber,
      linkedInProfile,
      company,
      position,
      notess,
      status,
      user: req.user.id,
    });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 3 : Update an existing Note using: POST "/api/notes/updatenote".Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    linkedInProfile,
    company,
    position,
    notes,
    status
  } = req.body;

  try {
    //Create a newNote object
    const newNote = {
      name: "",
      email: "",
      phoneNumber: "",
      linkedInProfile: "",
      company: "",
      position: "",
      notes: "",
      status:""
    };
    if (name) {
      newNote.name = name;
    }
    if (email) {
      newNote.email = email;
    }
    if (phoneNumber) {
      newNote.phoneNumber = phoneNumber;
    }
    if (linkedInProfile) {
      newNote.linkedInProfile = linkedInProfile;
    }
    if (company) {
      newNote.company = company;
    }
    if (position) {
      newNote.position = position;
    }
    if (notes) {
      newNote.notes = notes;
    }
    if (status) {
      newNote.status = status;
    }

    //find the note to be updated and update it
    let note = Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user && note.user.toString() !== req.params.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 4 : Delete login user Details using
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/mail", fetchuser, async (req, res) => {
  try {
    const { email,message } = req.body;
    const note = new Mail({
      email,message,
      user: req.user.id,
    });
    const savedNote = await note.save();
    await emailProcessor({
      email,message,
      type: "new-user-confirmation-required",
    });

    res.json(savedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
