import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [myUser, setMyUser] = useState({
    username: "",
    password: "",
  });
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  function handleChange(event) {
    //console.log(event.target.value);
    const value = event.target.value;
    setMyUser({
      ...myUser,
      [event.target.name]: value,
    });
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/Signout");
  }, [user, loading]);

  return (
    <div className="card centered">
      <h1>Login</h1>
      <form action="">
        {/* <div className="form-group">
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
        </div> */}

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
            //value="D1ff7d8l%"

            value={myUser.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="form-control"
            required
          />
        </div>

        <button
          type="button"
          id="submit"
          className="btn btn-primary"
          onClick={() =>
            logInWithEmailAndPassword(myUser.email, myUser.password)
          }
        >
          Login
        </button>
      </form>
      <p>
        Don't have a account? <Link to="/Signup">Register</Link> here
      </p>
    </div>
  );
}
