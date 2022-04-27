import React from "react";
import "./styles.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Signout from "./components/Signout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Login title="Login" />} exact />
        <Route path="/Signup" element={<Signup title="Signup" />} />
        <Route path="/Signout" element={<Signout title="Signout" />} />
      </Routes>
      {/* <Signup /> */}
    </div>
  );
}

export default App;
