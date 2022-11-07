//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//creating express app
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
//configuring dotenv variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://admin:admin123@cluster0.mfhcgcz.mongodb.net/?retryWrites=true&w=majority";

//creating express server
app.listen(PORT, async () => {
  //mongoDB connection
  mongoose.connect(MONGO_URI, err => {
    if (err) {
      return console.error(err);
    }
    console.log("MongoDB connected!🔥");
  });
  console.log(`Express server running at PORT ${PORT} 😍`);
});