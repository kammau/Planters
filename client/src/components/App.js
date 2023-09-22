import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import PlantCollection from "./PlantCollection"
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session")
    .then((res) => {
      if (res.ok) {
        res.json().then((user) => setUser(user))
      }
    })
  }, [])

  function handleLogin(user) {
    setUser(user)
  }

  function handleLogout() {
    setUser(null)
    return <Login handleLogin={handleLogin}/>
  }

  return (
    <div>
      <>
        {!user ? (
          <>
            <NavBar user={user} handleLogin={handleLogin} onLogout={handleLogout}/>
            <Switch>
              <Route exact path="/login">
                <Login handleLogin={handleLogin} />
              </Route>
              <Route exact path="/signup">
                <Signup handleLogin={handleLogin} />
              </Route>
            </Switch>
          </>
        ) : (
          <>
            <NavBar user={user} onLogout={handleLogout} />
            <Switch>
              <Route exact path="/plants">
                <PlantCollection user={user} />
              </Route>
            </Switch>
          </>
        )}
      </>
    </div>
  );
}

export default App;
