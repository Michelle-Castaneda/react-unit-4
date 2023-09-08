import React from "react";
import { createContext, useReducer, useEffect } from "react";

// import {}

//The initialState is used by the useReducer hook to create an instance of state that can be consumed at large by 
//simply referencing state followed by the key you wish to reference (such as state.token). 

const initialState = {
  userId: null,
  token: null,
  exp: null,
  username: null
};

const AuthContext = createContext();

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storedId = localStorage.getItem("userId");
  const storedName = localStorage.getItem("username");

  let remainingTime = storedExp - new Date().getTime()
  if(remainingTime < 0) {
    localStorage.clear()
    return null
  }
  //TODO CALCULATE REMAINING TIME FROM THE EXP DATE.

  return {
    token: storedToken,
    exp: storedExp,
    userId: storedId,
    username: storedName
  };
};

//The state is whatever the current value of state is, and the action is an object that contains information about
//what state should be altered, how it should be altered, and any additional information that needs to be added or taken away from state.

const AuthContextProvider = (props) => {
  const reducer = (state, action) => { //The reducer function takes in the current value of state and an action as parameters
    switch (action.type) {
      case "LOGIN":
        let { token, exp, userId, username } = action.payload;
        localStorage.setItem("token", token);
        localStorage.setItem("exp", exp);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        return { ...state, token, exp, userId, username };
      case "LOGOUT":
        localStorage.clear();
        return initialState;
      case "RETURNING_USER":
        let { token: t, userId: u, exp: e, username: n } = action.payload;
        return { ...state, token: t, userId: +u, exp: +e, username: n };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let localData = getLocalData();
    if (localData) {
      dispatch({ type: "RETURNING_USER", payload: localData });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
