const Note = require("../models/notebook");

exports.notepadMainController = async (req, res) => {
  try {
    const notes = await Note.find();
    res.render("notepad", { notes: notes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.makeNewNote = async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(note);
  try {
    const newNote = await note.save();
    res.status(201).redirect("/notepad");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    if (!noteId) {
      const error = new Error("Could not find Note.");
      error.statusCode = 404;
      throw error;
    }
    await Note.findByIdAndDelete(noteId);
    res.status(200).redirect("/notepad");
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.log(err);
  }
};
