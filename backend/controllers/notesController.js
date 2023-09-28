import Notes from "../models/Notes.js";
import { validationResult } from "express-validator";

//create note
export const createNoteController = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // validation using express-validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        error: error.array(),
      });
    }

    //creating note
    const note = await new Notes({
      title,
      description,
      tag,
      user: req.user._id,
    });
    //save note
    const saveNote = await note.save();
    //  response note
    res.json(saveNote);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Enternal Sever Error",
    });
  }
};

//fetch notes
export const fetchAllNotesController = async (req, res) => {
  try {
    //fetch nodes by using id
    const notes = await Notes.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Enternal Sever Error",
    });
  }
};

//update node
export const updateNoteController = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and updated it
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found!");
    }
    //cheacking user note
    if (note.user.toString() !== req.user._id) {
      return res.status(401).send("Not Allowed");
    }
    //updating note
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Enternal Sever Error",
    });
  }
};

export const deleteNoteController = async (req, res) => {
  try {
    //find the note by id
    let note = await Notes.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found!");
    }
    //cheacking user note
    if (note.user.toString() !== req.user._id) {
      return res.status(401).send("Not Allowed");
    }
    //delete note
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Enternal Sever Error",
    });
  }
};
