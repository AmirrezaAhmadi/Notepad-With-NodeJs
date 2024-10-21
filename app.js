const express = require("express");
const app = express();

const path = require("path");
const notepadRouter=require('./router/notepadRouter');
const bodyParser = require('body-parser');

require("dotenv").config();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(notepadRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`your server is running on port : ${port}`);
});

