import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ExerciseList from "./components/ExerciseList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";


export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" element={<ExerciseList />} exact />
          <Route path="/exercises/update/:id" element={<EditExercise />} />
          <Route path="/exercises/add" element={<CreateExercise />} />
          <Route path="/users/add" element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
}
