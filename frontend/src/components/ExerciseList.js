import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ExerciseList(){

    const [exerciseList, setExerciseList] = React.useState([])

    React.useEffect(() => {
        axios.get("http://localhost:5000/exercises")
            .then(res => {
                setExerciseList(res.data.data)
            })
    }, [])

    function deleteExercise(id){
        axios.delete("http://localhost:5000/exercises/"+id)
            .then(res => {
                setExerciseList(exerciseList.filter(exercise => exercise._id !== id))
            })
    }


    return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        exerciseList.map(exercise => (
                            <tr key={exercise._id}>
                                <td>{exercise.username}</td>
                                <td>{exercise.description}</td>
                                <td>{exercise.duration}</td>
                                <td>{exercise.date.substring(0, 10)}</td>
                                <td>
                                    <Link to={"/exercises/update/"+exercise._id}>edit</Link> | <a href="#" onClick={() => deleteExercise(exercise._id)}>delete</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}