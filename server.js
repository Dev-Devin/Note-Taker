const express = require("express");
const path = require("path");
const fs = require("fs");

const dbNotes = require("./db/db.json");
const { right } = require("inquirer/lib/utils/readline");
const { json } = require("express");
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.post("/api/notes", (req, res) => {
  const savedNotes = dbNotes;
  const newNote = req.body;
  savedNotes.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(savedNotes)
  );
  res.json(savedNotes);
});

app.get("/api/notes", (req, res) => {
  const notes = dbNotes;
  res.json(notes);
});

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
