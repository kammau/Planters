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

  useEffect(() => {
    fetch("/check_session")
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    })
  }, []);


  return (
    <div className="App">
      <nav>
        {user ? (
              <Switch>
                <Route path="/forums">
                  <Forums />
                </Route>
            </Switch>
        ) : (
          // <div>
          //   <h3 onClick={() => setView("login")}>Login</h3>
          //   <h3 onClick={() => setView("signup")}>Signup</h3>
          //   <h3 onClick={() => console.log(user)}>Show</h3>
          // </div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
          </Switch>
        )}
      </nav>
      {view === "login" ? <Login setUser={setUser}/> : <Signup />}
    </div>
  );
}

export default App;
