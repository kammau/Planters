import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Forums from "./Forums";
import PlantCollection from "./PlantCollection";
import Signup from "./Signup";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login")

  // useEffect(() => {
  //   fetch("/check_session")
  //   .then((res) => {
  //     if (res.ok) {
  //       res.json().then((user) => setUser(user));
  //     }
  //   })
  // }, []);


  return (
    <div className="App">
      <nav>
        <h3 onClick={() => setView("login")}>Login</h3>
        <h3 onClick={() => setView("signup")}>Signup</h3>
      </nav>
      {view === "login" ? <Login /> : <Signup />}
    </div>
  );
}

export default App;
