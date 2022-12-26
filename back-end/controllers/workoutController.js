const Workout = require("../models/workoutsModel");
const mongoose = require("mongoose");

//Get all the workouts in the db
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//Create a new workout document
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  //The process of creating a workout document is async
  // We need to await the creation of the workouts document
  //Hence we need to make the function asynchronous as well

  try {
    const workout = await Workout.create({ title, reps, load });
    return res.status(200).json(workout);
  } catch (error) {
    //Set the code to an erroneous code
    return res.status(400).json({ error: error.message });
  }
};

//The req parameter on a get request

//Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  } else {
    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  }
};

//Delete a single workout

const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json({ message: "Workout deleted" });
};

//Update workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ message: "No such workout" });
  }
  res.status(200).json({ message: "Workout updated successfully" });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};
