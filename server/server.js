/* 
    Initiial start up of API server using Express
*/

const express = require("express");
const app = express();
const cors = require("cors");
// Get variables from config.env
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
// Configure Express instance
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // initial connection to database at server start
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});