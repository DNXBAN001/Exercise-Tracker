import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function CreateExercise(props){

    const [exercise, setExercise] = React.useState({
        username: "",
        description: "",
        duration: "",
        date: new Date(),
        users: []
    })

    React.useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(res => {
                if(res.data.data.length > 0 ){
                    setExercise(prevExercise => (
                        {
                            ...prevExercise,
                            users: res.data.data.map(user => user.username),
                            username: res.data.data[0].username
                        })
                    )
                }
               }
            )
    }, [])

    function handleChange(event){
        const {name, value, type, checked} = event.target;
        setExercise(prevExercise => (
          {
            ...prevExercise,
            [name]: type === "checkbox" ? checked: value
          }) 
        )
    }
    function handleDateChange(date){
        setExercise(prevExercise => (
            {
              ...prevExercise,
              date: date
            }) 
          )
    }

    function handleSubmit(event){
        event.preventDefault();
        const newExercise = {
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        }
        submitToAPI(newExercise);

        window.location = "/" //direct user back to home page after submitting the form data
      }
    function submitToAPI(newExercise){
        console.log(newExercise)
        axios.post("http://localhost:5000/exercises/add", newExercise)
            .then(res => console.log(res.msg))
    }

    return (
        <div className="create-exercise-container">
            Create New Exercise <br/><br/>
            <form onSubmit={handleSubmit}>
                <label>Username</label><br/>
                <select 
                    required
                    className="form-control"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                    value={exercise.username}
                >
                    {
                        exercise.users.map(user => {
                            return (
                                <option 
                                    key={user}
                                    value={user}
                                >{user}</option>
                            )
                        })
                    }
                </select><br/><br/>
                <label>Description</label><br/>
                <input type="text"
                    className="form-control"  
                    placeholder="description"
                    name="description"
                    onChange={handleChange}
                    value={exercise.description}
                /><br/><br/>
                <label>Duration (in minutes)</label><br/>
                <input type="text"
                    className="form-control"
                    placeholder="duration"
                    name="duration"
                    onChange={handleChange}
                    value={exercise.duration}
                /><br/><br/>
                <label>Date</label><br/>
                <DatePicker
                    selected={exercise.date}
                    onChange={handleDateChange}
                /><br/><br/>
                <input type="submit" value="Create Exercise" className="btn btn-primary" />
            </form>
        </div>
    )
}