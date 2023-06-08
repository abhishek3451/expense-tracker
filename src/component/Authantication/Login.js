import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Authreducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevdata) => ({ ...prevdata, [name]: value }));
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_6gzTaoLHwNICFncYZ4begFDtridK5HQ",
        {
          method: "POST",
          body: JSON.stringify({
            email: userDetails.email,
            password: userDetails.password,

            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        dispatch(
          authActions.login({ token: data.idToken, userId: data.email })
        );

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("userId", data.email);
        console.log("user");
        navigate("/expense");
      } else {
        const data = await res.json();
        alert(data.error.message);
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={changeHandler}
          />
        </div>
        <div className={classes.control}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={changeHandler}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button type="submit">Login</button>}
          {isLoading && <p>Sending request...</p>}
          <Link to="/forgotpassword">
            <button type="submit" className={classes.toggle2}>
              Forgot password?
            </button>
          </Link>
          <Link to="/signup">
            <button type="submit" className={classes.toggle}>
              New User? Sign Up
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
