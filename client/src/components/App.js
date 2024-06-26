import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import PlantCollection from "./PlantCollection"
import Login from "./Login";
import Signup from "./Signup";
import Posts from "./Posts";
import Plants from "./Plants";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session")
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user.username))
      }
    })
  }, [])

  function handleLogin(user) {
    setUser(user)
  }

  function handleLogout() {
    setUser(null)
  }

  return (
    <div>
      <>
        {!user ? (
          <>
            <Switch>
              <Route exact path="/login">
                <Login handleLogin={handleLogin} />
              </Route>
              <Route exact path="/signup">
                <Signup handleLogin={handleLogin} />
              </Route>
              <Redirect from="/" to="login" />
            </Switch>
          </>
        ) : (
          <>
            <NavBar user={user} onLogout={handleLogout} />
            <Switch>
              <Route exact path="/user_plants">
                <PlantCollection user={user} />
              </Route>
              <Route exact path="/posts">
                <Posts/>
              </Route>
              <Route exact path="/plants">
                <Plants user={user}/>
              </Route>
              <Redirect from="/" to="plants" />
            </Switch>
          </>
        )}
      </>
    </div>
  );
}

export default App;
