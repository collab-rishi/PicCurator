const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  createNewUser,
  getPhotos,
  savePhotos,
  addTagsToPhotos,
  searchAndSort,
  getSearchHistory
} = require("./src/controllers/dataController.js");

const { sequelize } = require("./models");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.post("/api/users", createNewUser);
console.log("0");
app.get("/api/photos/search", getPhotos);

app.post("/api/photos", savePhotos);

app.post("/api/photos/:photoId/tags", addTagsToPhotos)

app.get("/api/photos/tag/search", searchAndSort);

app.get("/api/search-history", getSearchHistory);



console.log("0a");
sequelize
  .authenticate()
  .then(() => {
    console.log("database connected.");
  })
  .catch((error) => {
    console.error("Unable to connect to a database", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports=app;