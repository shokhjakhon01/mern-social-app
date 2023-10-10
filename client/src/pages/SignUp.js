import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SignUp = () => {
  return (
    <div className="mycard">
      <div className="card card_auth">
        <h2 className="">ShohGram</h2>
        <div className="input-field col s6">
          <i className="material-icons prefix">person</i>
          <input
            id="name"
            type="text"
            className="validate"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <label for="name">Name</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">email</i>
          <input
            id="icon_prefix"
            type="email"
            class="validate"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <label for="icon_prefix">Email</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">password</i>
          <input
            id="password"
            type="password"
            className="validate"
          />
          <label for="password">Password</label>
        </div>
        <button className="waves-effect waves-light btn #1565c0 blue darken-3">
          Sign up
        </button>
        <p>
          <Link to="/login">Already have an account?</Link>
        </p>
      </div>
    </div>
  );
};
