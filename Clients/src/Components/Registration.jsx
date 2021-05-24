import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {NavLink} from "react-router-dom";
import Person from "@material-ui/icons/Person";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import Phone from "@material-ui/icons/Phone";
import Work from "@material-ui/icons/Work";
import Visibility from "@material-ui/icons/Visibility";
import "../css-components/Reg.css";

const Registration = () => {
  const history = useHistory();

  const [user, userstate] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    work: "",
  });
  let name;
  let value;
  const inpEvent = (e) => {
    name = e.target.name;
    value = e.target.value;
    userstate((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword, phone, work } = user;
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
        phone,
        work,
      }),
    });
    const data = await res.json();
    if (data.status === 422 || !data) {
      window.alert("invalid credentials");
      console.log("invalid credentials");
    } else {
      window.alert("Registration successfully");
      console.log("Registration successfully");
      console.log(data);
      history.push("./Login");
    }
  };

  const [state, setstate] = useState("password");
  const hide = () => {
    if (state === "password") {
      setstate("text");
    } else {
      setstate("password");
    }
  };
  return (
    <>
      <div className="cont">
        <div className="signup-content">
          <div className="signup-form">
            <h2 className="form-title">Sign up</h2>
            <form className="form" method="POST">
              <div className="form-group">
                <label htmlFor="name">
                  <Person />
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  name="name"
                  value={user.name}
                  onChange={inpEvent}
                  id="name"
                  className="inp-text"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <Email />
                </label>
                <input
                  placeholder="Your email"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={inpEvent}
                  id="email"
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
                  type={state}
                  name="password"
                  value={user.password}
                  onChange={inpEvent}
                  id="password"
                  className="inp-text"
                  autoComplete="off"
                />
                <span className="hides">
                  <Visibility className="hide" onClick={hide} />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">
                  <LockOpen />
                </label>
                <input
                  placeholder="Confirm password"
                  type="password"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={inpEvent}
                  id="cpassword"
                  className="inp-text"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  <Phone />
                </label>
                <input
                  placeholder="Your Phone"
                  type="number"
                  name="phone"
                  value={user.phone}
                  onChange={inpEvent}
                  id="phone"
                  className="inp-text"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <label htmlFor="work">
                  <Work />
                </label>
                <input
                  type="text"
                  name="work"
                  value={user.work}
                  onChange={inpEvent}
                  placeholder="Profession"
                  id="work"
                  className="inp-text"
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  name="submit"
                  id="submit"
                  className="inp-submit"
                  onClick={postData}
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

<NavLink to="/Login">Already an Account</NavLink>
</div>
        </div>
      </div>
    </>
  );
};

export default Registration;
