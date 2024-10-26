const express = require("express");
const app = express();

const path = require("path");
const notepadRouter=require('./router/notepadRouter');
const bodyParser = require('body-parser');
const Note = require('./models/notebook');
const mongoose = require('mongoose');

require("dotenv").config();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(notepadRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`your server is running on port : ${port}`);
});

