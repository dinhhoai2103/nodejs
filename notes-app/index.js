import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getAllNotes, addNote, removeNote, getNote } from "./notes.js";

yargs(hideBin(process.argv))
  .command({
    command: "list",
    describe: "List all notes",
    handler: () => getAllNotes(),
  })
  .parse();

yargs(hideBin(process.argv))
  .command({
    command: "get",
    describe: "Get a note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    handler: ({ title }) => getNote(title),
  })
  .parse();

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Add a new note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Note body",
        demandOption: true,
        type: "string",
      },
    },
    handler: ({ title, body }) => addNote(title, body),
  })
  .parse();

yargs(hideBin(process.argv))
  .command({
    command: "remove",
    describe: "Remove a note",
    builder: {
      title: {
        describe: "Note title",
        demandOption: true,
        type: "string",
      },
    },
    handler: ({ title }) => removeNote(title),
  })
  .parse();

yargs(hideBin(process.argv))
  .command({
    command: "read",
    describe: "Read a note",
    handler: () => console.log("Reading a note"),
  })
  .parse();
