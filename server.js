require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;

//pulls in username and password from .env
//note that naming convention is all caps for .env variables
const user = process.env.USER;
const password = process.env.PASSWORD;

//limits access to client/public folder for security
app.use(express.static(path.resolve("./client/public")));

//middlewear to read req.body
app.use(express.urlencoded({ extended: true }));

//catchall
app.get("*", (req, res) => {
  res.sendFile(path.resolve("./client/public/index.html"));
});

//keeps port open and listening
app.listen(port, () => {
  console.log("listening on port", port);
});
