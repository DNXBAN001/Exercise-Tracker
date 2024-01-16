import React from "react";
import axios from "axios";

export default function CreateUser(){

    const [ user, setUser] = React.useState({
        username: "",
        password: ""
    })

    function handleChange(event){
        const { name, value, type, checked }  = event.target
        setUser(prevUser => {
            return(
                {
                    ...prevUser,
                    [name]: type === "checkbox" ? checked : value
                }
            )
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        const newUser = {
            username: user.username,
            password: user.password
        }
        submitToAPI(newUser)
        //window.location = "/" //direct user to home ppage after creating new user
    }

    function submitToAPI(newUser){
        console.log(newUser)
        axios.post("http://localhost:5000/users/add", newUser)
            .then(res => res.success)
            .catch(res => console.log(res.success))

        setUser({
            username: "",
            password: ""
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Create New User<br/><br/>
                <label>Username</label><br/>
                <input type="text"
                    placeholder="username"
                    className="form-control"
                    name="username"
                    onChange={handleChange}
                    value={user.username}
                /><br/><br/>
                <label>Username</label><br/>
                <input type="password"
                    placeholder="password"
                    className="form-control"
                    name="password"
                    onChange={handleChange}
                    value={user.password}
                /><br/><br/>
                <input type="submit" value="Create New User" className="btn btn-primary" />
            </form>
        </div>
    )
}