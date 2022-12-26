import React from "react";
import { useState } from "react";

const WorkoutForm = () => {

  // Variables that are going to hold input data

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  //A function that handles post requests from the table

  const handleSubmit = async (e) => {

    //Prevent default actions when a button
    // in a form is clicked
    e.preventDefault();

    //Create an object with the request data, 
    // ie data to save to the db
    const workout = { title, load, reps };

    //Fetch the API, send data
    const response = await fetch("/api/workouts", {
      method: "POST",
      //send the JSON of the workout object
      body: JSON.stringify(workout),

      //set headers
      headers: {
        "Content-Type": "application/json",
      },
    });

    //get response data and store them
    const json = await response.json();

    //handle errors
    
    //If an error has occured assign its details to the error variable
    //to be displayed later on

    if (!response.ok) {
      setError(json.error);
    }

    //if no error has occured set the values of the handling variables
    //console a confirmation message
    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      console.log("new workout added", json);
    }

  };

  return (
    <form action="" onSubmit={handleSubmit} className="create">
      <h3>Add a new Workout</h3>

      {/*Declare fields of the form, add input handlers to synchronize it with corresponding variables 
      and set their values as well to the value of corresponding variables*/}
      
      <label>Exercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
