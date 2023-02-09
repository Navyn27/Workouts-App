require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set("strictQuery", true);

const workoutRoutes = require("./routes/router");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();

app.use(express.json());

//middleware
app.use((req, res, next) => {
  cors({ origin: req.headers.origin });
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  console.log(req.path, req.method);
  next();
});
app.get("/", (req, res) => {
  res.json({ mssg: "gotcha" });
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/users", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI_LOCAL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to the db & Listening on port 4000");
    });
  })
  .catch((err) => console.log(`${err} , connection failed`));
