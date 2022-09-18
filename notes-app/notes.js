import chalk from "chalk";
import fs from "fs";

const getAllNotes = () => {
  console.log(chalk.yellow.inverse("Your note"));
  const notes = loadNotes();
  notes.forEach((note) => console.log(chalk.green("Title: ", note.title)));
};

const getNote = (title) => {
  const notes = loadNotes();
  const result = notes.find((note) => note.title === title);
  if (result && Object.keys(result).length > 0) {
    console.log(
      chalk.green.inverse("Title:", result.title, "\nBody:", result.body)
    );
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

const loadNotes = () => {
  try {
    const notesData = fs.readFileSync("./notes.json").toString();
    return JSON.parse(notesData);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("./notes.json", dataJSON);
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.filter((note) => note.title === title);
  if (duplicateNote && duplicateNote.length === 0) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
    getAllNotes();
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (notes.length > newNotes.length) {
    saveNotes(newNotes);
    console.log(chalk.green.inverse("Note removed!"));
    getAllNotes();
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

export { getAllNotes, getNote, addNote, removeNote };
