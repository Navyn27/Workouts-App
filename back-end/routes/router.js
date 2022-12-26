const express = require("express");
const router = express.Router();

const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

//Get all the workouts
router.get("/", (req, res) => {
  getWorkouts(req, res);
});

//POST a new workout
router.post("/", (req, res) => {
  createWorkout(req, res);
});

//GET a single workout
router.get("/:id", (req, res) => {
  getWorkout(req, res);
});

//DELETE a workout
router.delete("/:id", (req, res) => {
  deleteWorkout(req, res);
});

//UPDATE a single workout
router.patch("/:id", (req, res) => {
  updateWorkout(req, res);
});

module.exports = router;
