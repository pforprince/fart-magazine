const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

var random;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./client/public/uploads");
  },
  filename: (req, file, cb) => {
    random = Date.now();
    cb(null, random + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/add", upload.single("imageName"), async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({
    title,
    content,
    imageName: random + req.file.originalname,
  });
  await note
    .save()
    .then((result) => {
      res.status(200).json({
        title: result.title,
        content: result.content,
        imageName: result.imageName,
      });
    })
    .catch((e) => console.log(e));
});

router.get("/:id", (req, res) => {
  console.log("42");
  console.log(req.params.id);
  Note.findOne({ _id: req.params.id }, (err, note) => {
    if (err) console.log(err);
    res.json({ note });
  });
});

router.put("/:id", upload.single("imageName"), async (req, res) => {
  const { id } = req.params;
  const imageName = req.file ? req.file.originalname : undefined;

  const { title, content } = req.body;

  const note = await Note.findById(id);
  const oldName = note.imageName;
  (note.title = title), (note.content = content);
  if (imageName) note.imageName = random + imageName;

  note
    .save()
    .then((result) => {
      res.json({ result });
      fs.unlinkSync(`./client/public/uploads/${oldName}`);
    })
    .catch((e) => console.log(e));
});

router.get("/", async (req, res) => {
  const allNotes = await Note.find({});
  if (allNotes) {
    res.status(200).json({ notes: allNotes });
  } else
    res.staus(400).json({
      error: "Something went wrong! Try again!",
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findOneAndDelete({ _id: id }, (err, deleted) => {
      if (err) {
        console.log(err);
      } else {
        fs.unlinkSync(`./client/public/uploads/${deleted.imageName}`);
        res.status(200).json({ message: "Note deleted successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/search", (req, res) => {
  const { text } = req.body;
  console.log("wokring searcg");
  Note.find(
    { $or: [{ title: text }, { content: text }] },
    function (err, result) {
      if (err) console.log(err);
      res.json({ result });
    }
  );
});

module.exports = router;
