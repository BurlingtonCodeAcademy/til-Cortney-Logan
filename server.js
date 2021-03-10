require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { title } = require("process");

const port = process.env.PORT || 5000;

//pulls in username and password from .env
//note that naming convention is all caps for .env variables
const user = process.env.USER;
const password = process.env.PASSWORD;

//-------------------- Server as frontend to Database Back End --------------------//

//set up connection to local db "til"
mongoose.connect("mongodb://localhost:27017/til", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//reference to til database
const tilDB = mongoose.connection;

//db connection error handling
tilDB.on("error", (err) => {
  console.error(err);
});

//defines entry schema
const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
  categories: String,
});

//sets up reference to EntryModel
const EntryModel = mongoose.model("Entry", entrySchema);

//-------------------- Server as backend to React Front End --------------------//
//limits access to client/public folder for security
app.use(express.static("./client/public"));

//middlewear to read req.body
app.use(express.urlencoded({ extended: false }));

//---------- Home Page ----------//
//accepts users input from home page to create new post
app.post("/test", (req, res) => {
  //accepts input and stores in variable newPost
  let newEntry = req.body;
  console.log(newEntry);

  //accepts new post entry and saves to the database
  createNewEntry(newEntry);

  res.redirect("../");
});

//catchall
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/public/index.html"));
});

//keeps port open and listening
app.listen(port, () => {
  console.log("listening on port", port);
});

//-------------------- Supporting Functions --------------------//
async function createNewEntry(entry) {
  console.log("the entry is", entry);
  let today = new Date();
  console.log("date is ", today.toLocaleDateString())
  //creates a new instance of the entry model
  //   const newEntry = new entrySchema({
  //     title: entry.title,
  //     content: entry.content,
  //     date: "",
  //     categories: entry.categories,
  //   });

  //   newEntry.save((err, data) => {
  //     if (err) {
  //       console.error(err.message);
  //     } else {
  //       console.log("Successfully added: ", data);
  //     }
  //   });
}
