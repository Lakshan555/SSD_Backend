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
const MONGO_URI = process.env.MONGO_URI;

//creating express server
app.listen(PORT, async () => {
    //mongoDB connection
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
      console.log("MongoDB connected!🔥");
    } catch (error) {
      console.log(error);
    }
  
    console.log(`Express server running at PORT ${PORT} 😍`);
  });