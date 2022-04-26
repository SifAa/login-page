import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "./firebase";

export default function Signup() {
  const [myUser, setMyUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/Signout");
  }, [user, loading]);

  // definer formen så man kan hente alle dataerne
  let form = document.querySelector("form");
  // definer alle regex så de kan kaldes
  let regexName = /^[a-zæøåA-ZÆØÅ\s\-]{5,}$/;
  /* Atleast five characters long only alphabet and a dash allowed (was to lazy to add more) */
  let regexMail = /^[a-zA-Z\d._-]+@cphbusiness\.dk$/;
  /* Has to be a cphbusiness.dk mail */
  let regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\S])[a-zA-Z\d\S]{8,}$/;
  /* password:
        lower and uppercase letters
        at least one number
        at least 8 characters
        a symbol 
  */

  function handleChange(event) {
    //console.log(event.target.value);
    const value = event.target.value;
    setMyUser({
      ...myUser,
      [event.target.name]: value,
    });
  }

  function submitForm() {
    if (
      regexName.test(form.username.value) &&
      regexMail.test(form.mail.value) &&
      regexPass.test(form.password.value) &&
      form.password.value === form.repeatPassword.value
    ) {
      registerWithEmailAndPassword(
        myUser.username,
        myUser.email,
        myUser.password
      );
    }

    if (regexName.test(form.username.value)) {
      form.username.className = form.username.className.replace(" error", "");
    } else {
      form.username.className = form.username.className + " error";
    }
    if (regexMail.test(form.mail.value)) {
      form.mail.className = form.mail.className.replace(" error", "");
    } else {
      form.mail.className = form.mail.className + " error";
    }
    // error outline for incorrect password value
    if (regexPass.test(form.password.value)) {
      form.password.className = form.password.className.replace(" error", "");
    } else {
      form.password.className = form.password.className + " error";
    }
    // error outline for mismatch password
    if (form.password.value === form.repeatPassword.value) {
      form.repeatPassword.className = form.repeatPassword.className.replace(
        " error",
        ""
      );
    } else {
      form.repeatPassword.className = form.repeatPassword.className + " error";
    }
  }

  return (
    <div className="card centered">
      <h1>Signup</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={myUser.username}
            onChange={handleChange}
            autoComplete="username"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Cphbusiness mail</label>
          <input
            type="email"
            id="mail"
            name="email"
            placeholder="email"
            value={myUser.email}
            onChange={handleChange}
            autoComplete="email"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={myUser.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="repeatPassword">Repeat Password</label>
          <input
            type="password"
            id="repeatPassword"
            placeholder="repeat password"
            //value="D1ff7d8l%"
            autoComplete="new-password"
            className="form-control"
            required
          />
        </div>

        <button
          type="button"
          id="submit"
          className="btn btn-primary"
          onClick={submitForm}
        >
          Submit
        </button>
      </form>
      <p>
        Already have a user, <Link to="/">login</Link> here
      </p>
    </div>
  );
}
