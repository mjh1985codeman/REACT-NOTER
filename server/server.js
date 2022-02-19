const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use(require("./routes/note-routes", cors()));
// import the database connection
const dbo = require("./db/connection");

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
