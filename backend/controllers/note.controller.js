import NoteModel from "../models/note.model.js";
import mongoose from "mongoose";

export const getNotes = async (req, res) => {
  try {
    const notes = await NoteModel.find();
    console.log(req.user)
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const note = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Invalid id");
    }

    const updatedNote = await NoteModel.findByIdAndUpdate(_id, note, {
      new: true,
    });

    res.json(updatedNote);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addNote = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const note = req.body;
    note.user = userId;
    const newNote = new NoteModel(note);
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const deletedNote = await NoteModel.findByIdAndDelete(_id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
