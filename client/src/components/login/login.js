import "./login.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import env from "../../env";

function Login({ logindata }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    signupemail: "",
    signuppassword: "",
    signuppasswordc: "",
    firstname: "",
    lastname: "",
  });
  const {
    email,
    password,
    signupemail,
    signuppassword,
    signuppasswordc,
    firstname,
    lastname,
  } = data;

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };

  const authenticate = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${env.BACKEND}/auth/login`, {
          email: email[0],
          password: password[0],
        })
        .then(async (res) => {
          await logindata(res.data);
          localStorage.setItem("logintoken", res.data.token);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const signup = async (e) => {
    e.preventDefault();
    if (signuppassword[0] == signuppasswordc[0]) {
      try {
        await axios
          .post(`${env.BACKEND}/auth/signup`, {
            firstname: firstname[0],
            lastname: lastname[0],
            email: signupemail[0],
            password: signuppassword[0],
            image: "not_uploaded.png"
          })
          .then(async (res) => {
            await logindata(res.data);
            localStorage.setItem("logintoken", res.data.token);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="auth">
      <div className="login">
        <center>
          <form>
            <div className="loginblock">
              <label>Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={changeHandler}
              />
              <br />
            </div>
            <div className="loginblock">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={changeHandler}
              />
              <br />
            </div>
            <button className="loginbtn" onClick={authenticate}>
              LOGIN
            </button>
          </form>
        </center>
      </div>
      <div className="signup">
        <center>
          <form>
            <div className="loginblock">
              <label>Email</label>
              <input
                type="text"
                name="signupemail"
                value={signupemail}
                onChange={changeHandler}
              />
              <br />
            </div>
            <div className="loginblock">
              <label>Firstname</label>
              <input
                type="text"
                name="firstname"
                value={firstname}
                onChange={changeHandler}
              />
              <br />
            </div>
            <div className="loginblock">
              <label>Lastname</label>
              <input
                type="text"
                name="lastname"
                value={lastname}
                onChange={changeHandler}
              />
              <br />
            </div>
            <div className="loginblock">
              <label>Password</label>
              <input
                type="password"
                name="signuppassword"
                value={signuppassword}
                onChange={changeHandler}
              />
              <br />
            </div>
            <div className="loginblock">
              <label>Confirm Password</label>
              <input
                type="password"
                name="signuppasswordc"
                value={signuppasswordc}
                onChange={changeHandler}
              />
              <br />
            </div>
            <button className="loginbtn" onClick={signup}>
              SIGNUP
            </button>
          </form>
        </center>
      </div>
    </div>
  );
}

export default Login;
