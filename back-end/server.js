require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const workoutRoutes = require("./routes/router");
const userRoutes = require("./routes/userRoutes");

// express app
const app = express();

app.use(express.json());

//middleware
app.use((req, res, next) => {
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
