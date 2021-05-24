import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {NavLink} from "react-router-dom";
import "../css-components/Log.css";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import { useContext } from "react";
import { userContext } from "./App";

const Login = () => {
  const {state,dispatch}=useContext(userContext);
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [states, setstate] = useState("password");
  const hide = () => {
    if (states === "password") {
      setstate("text");
    } else {
      setstate("password");
    }
  };
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data =  res.json();
    if (res.status === 400 || !data) {
      window.alert("invalid credentials");
    } else {
      dispatch({type:"USER",payload:true});
      window.alert("login successfull");
      history.push("/");
    }
  };
  return ( 
    <>
      <div className="cont">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Log in</h2>
            <form className="form" method="POST">
              <div className="form-group">
                <label htmlFor="email">
                  <Email />
                </label>
                <input
                  placeholder="Your email"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="inp-text"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <Lock />
                </label>
                <input
                  placeholder="Password"
                  type={states}
                  name="password"
                  id="password"
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  className="inp-text"
                  autoComplete="off"
                />
                <span className="hides">
                  <Visibility className="hide" onClick={hide} />
                </span>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Log in"
                  name="submit"
                  id="submit"
                  onClick={loginUser}
                  className="inp-submit"
                  autoComplete="off"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="img">
          <img
            src="https://p.kindpng.com/picc/s/488-4887037_technology-transparent-background-information-technology-images-png-png.png"
            alt="img"
          />
          <div className="account">

          <NavLink to="/Registration">Don't have an Account</NavLink>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
