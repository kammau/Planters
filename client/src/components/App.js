import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session")
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user));
      }
    })
  }, []);


  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route path="/">
              <Home user={user} />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route path="/signup">
              <Signup setUser={setUser} />
            </Route>
          </Switch>
        )}
      </main>
    </div>
  );
}

export default App;
