import React from 'react'
import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const { dispatch } = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    let body = {username, password}
    axios
      .post(register ? "/register" : "/login", body)
      .then((res) => {
        dispatch({type: "LOGIN", payload: res.data})
      })
      .catch((err) =>{
        if(err.response.data) {
          alert(err.response.data)
        }
        console.log(err)
      })    
    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
      <input className="form-input" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input className="form-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className="form-btn">{register ? "Sign Up" : "Login"}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;



//The dispatch function is used to send actions to the store to update the application's state. 
//In this case, a "LOGIN" action is dispatched, with the data from the response (i.e., res.data) being sent as the payload.


