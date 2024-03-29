const mongoose = require("mongoose");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema({
  name: String, // Define 'name' field
  studentID: String, // Define 'studentID' field
});

// Create a Model object

const Student = mongoose.model("Winter24", studentSchema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/", async (req, res) => {
  // get the data from the form
  const mongodbURI = req.params.myuri;

  // connect to the database and log the connection
  mongoose
    .connect(mongodbUri,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
      console.log("Connected to MongoDB");
      // add the data to the database
      
      return Student.create({ name: "Nate Bussabok", studentID: "300375256" });
    })
    .then(() => {
      console.log("Document added to the database");
      // send a response to the user
      res.send(`<h1>Document Added</h1>`);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      res.status(500).send(`<h1>Error: ${err.message}</h1>`);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
