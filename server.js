require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

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
  categories: {
    javascript: Boolean,
    json: Boolean,
    html: Boolean,
    css: Boolean,
    frontend: Boolean,
    backend: Boolean,
    fullstack: Boolean,
    databases: Boolean,
  },
});

//sets up reference to EntryModel
const EntryModel = mongoose.model("entries", entrySchema);

//-------------------- Server as backend to React Front End --------------------//
//limits access to client/public folder for security
app.use(express.static("./client/public"));

//middlewear to read req.body
app.use(express.urlencoded({ extended: true }));

//---------- Home Page ----------//
//accepts users input from home page to create new post
app.post("/addentry", (req, res) => {
  //accepts input and stores in variable newPost
  let newEntry = req.body;

  //accepts new post entry and saves to the database
  createNewEntry(newEntry);

  //refreshes page in response to reset form
  res.redirect("../");
});

//---------- Facts Page ----------//
//api end point to retrieve all entries from database
app.get("/allposts", async (req, res) => {
  //constructs cursor that contains all entries in database collection
  const cursor = await EntryModel.find({});

  //initializes an array to hold contents of cursor to be sent to Facts page
  let results = [];

  //adds each entry of cursor to results array
  await cursor.forEach((entry) => {
    results.push(entry);
  });

  //responds with json results as array
  res.json(results);
});

app.get("/filterPosts/:category/:input", async (req, res) => {
  //initiates variables for category and input for later use
  let category = req.params.category;
  let input = req.params.input;

  //if filter is for title or content search in put is directly user input
  if (category === "title" || category === "content") {
    //constructs cursor that contains all entries in database collection that match query
    const cursor = await EntryModel.find({ [category]: input });
    //initializes an array to hold contents of cursor to be sent to Facts page
    let results = [];
    //adds each entry of cursor into results array
    await cursor.forEach((entry) => {
      results.push(entry);
    });
    //responds with json results as array
    res.json(results);
  }
  //if users searched by category, input will be either true or false
  else {
    //constructs cursor that contains all entries in database collection that match query
    const cursor = await EntryModel.find({ [`categories.${input}`]: true });
    //initializes an array to hold contents of cursor to be sent to Facts page
    let results = [];
    //adds each entry of cursor into results array
    await cursor.forEach((entry) => {
      results.push(entry);
    });
    //responds with json results as array
    res.json(results);
  }
});

//api end point to accept facts page filter
app.post("/search", async (req, res) => {
  let body = req.body;
  //redirects to facts with query params for filtering
  res.redirect(`../facts?${body.category}=${body.input}`);
});

//---------- Individual Entry Page ----------//

//api end point to retrieve a single entry from database based on id
app.get("/individualpost/:postID", async (req, res) => {
  //stores postID from path as entry ID
  let entryID = req.params.postID;
  //awaits response from database - result will be an object since we're using findOne
  let entryObj = await EntryModel.findOne({ _id: ObjectId(entryID) });
  //respond with json object
  res.json(entryObj);
});

//post request to update a single entry
app.post("/editentry/:postID", async (req, res) => {
  //stores postID from path as entry ID
  let entryID = req.params.postID;
  //stores new post params from req.body
  let updatedEntry = req.body;

  //passes ID and updatedentry data to updateEntry function
  updateEntry(entryID, updatedEntry);

  //redirects to facts page
  res.redirect("../facts");
});

app.get("/deleteentry/:postID", async (req, res) => {
  //stores postID from path as entry ID
  let entryID = req.params.postID;

  //passes id as ObjectId to be deleted
  await EntryModel.deleteOne({ _id: ObjectId(entryID) });

  console.log("Successfully deleted: ", entryID);

  //send 200 statuscode
  return res.sendStatus(200);
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
//generates a new entry and sends it to database
async function createNewEntry(entry) {
  //sets the time of the entry in local date time string
  let entryTime = new Date().toISOString();

  //constructs the new entry using the EntryModel
  const newEntry = new EntryModel({
    title: entry.title,
    content: entry.content,
    date: entryTime,
    categories: {
      javascript: !!entry.javascript,
      json: !!entry.json,
      html: !!entry.html,
      css: !!entry.css,
      frontend: !!entry.frontend,
      backend: !!entry.backend,
      fullstack: !!entry.fullstack,
      databases: !!entry.databases,
    },
  });

  //saves new entry in the database, with error handling
  newEntry.save((err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Successfully added: ", data);
    }
  });
}

async function updateEntry(entryID, entry) {
  //constructs updated entry from submitted form using EntryModel
  const updatedEntry = {
    title: entry.title,
    content: entry.content,
    categories: {
      javascript: !!entry.javascript,
      json: !!entry.json,
      html: !!entry.html,
      css: !!entry.css,
      frontend: !!entry.frontend,
      backend: !!entry.backend,
      fullstack: !!entry.fullstack,
      databases: !!entry.databases,
    },
  };

  // //send request to database to update entry
  await EntryModel.updateOne(
    { _id: ObjectId(entryID) },
    { $set: updatedEntry }
  );

  console.log("Successfully updated: ", entryID);
}
