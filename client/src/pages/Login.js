import React, { useState, useEffect } from "react";
import "./css/register.css";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

export const Login = () => {
  const [clicked, setClicked] = useState(false);
  const [regName, setRegname] = useState("");
  const [regEmail, setRegemail] = useState("");
  const [regPassword, setRegpassword] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const histroy = useHistory();
  const { state, dispatch } = useContext(UserContext);

  const postData = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        regEmail
      )
    ) {
      return M.toast({
        html: "Enter your email is correctly",
        classes: "#e53935 red darken-1",
      });
    }
    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.data);
          dispatch({ type: "USER", payload: data.data });
        }
        if (data.status === 422) {
          M.toast({ html: data.message, classes: "#e53935 red darken-1" });
        } else {
          M.toast({
            html: data.message,
            classes: "#1b5e20 green darken-4",
          });
          histroy.push("/");
        }
      });
  };

  const loginData = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        logEmail
      )
    ) {
      return M.toast({
        html: "Enter your email is correctly",
        classes: "#e53935 red darken-1",
      });
    }
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logEmail,
        password: logPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.data));
          dispatch({ type: "USER", payload: data.data });
        }
        if (data.status === 422) {
          M.toast({ html: data.message, classes: "#e53935 red darken-1" });
        } else {
          M.toast({
            html: data.message,
            classes: "#1b5e20 green darken-4",
          });
          histroy.push("/");
        }
      });
  };

  return (
    <div className={clicked ? "containerr sign-up-mode" : "containerr"}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-fields">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                value={logEmail}
                onChange={(e) => setLogEmail(e.target.value)}
              />
            </div>
            <div className="input-fields">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={logPassword}
                onChange={(e) => setLogPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn solid"
              onClick={loginData}
            >
              Login
            </button>

            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a
                href="#"
                className="social-icon"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="social-icon"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="social-icon"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="#"
                className="social-icon"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-fields">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={regName}
                onChange={(e) => setRegname(e.target.value)}
              />
            </div>
            <div className="input-fields">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={regEmail}
                onChange={(e) => setRegemail(e.target.value)}
              />
            </div>
            <div className="input-fields">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={regPassword}
                onChange={(e) => setRegpassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn"
              onClick={postData}
            >
              Sign up
            </button>
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a
                href="#"
                className="social-icon"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="social-icon"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="social-icon"
              >
                <i className="fab fa-google"></i>
              </a>
              <a
                href="#"
                className="social-icon"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              onClick={() => setClicked(true)}
              className="btn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img
            src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              onClick={() => setClicked(false)}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img
            src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
