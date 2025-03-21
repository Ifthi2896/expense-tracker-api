const mongoose = require("mongoose");

const mongodbConnection = (URL) => {mongoose
  .connect(URL)
  .then(() => console.log("Mongodb Connected Successfully"))
  .catch((error) => console.log("Error", error.message));}

module.exports = mongodbConnection;
