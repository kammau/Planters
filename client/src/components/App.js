import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Forums from "./Forums";
import PlantCollection from "./PlantCollection";

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

  if (!user) {
    return <Login setUser={setUser} />
  }


  return (
    <div>
      <NavBar user={user} setUser={setUser}/>
      <Switch>
        <Route exact path="/collection">
          <PlantCollection user={user}/>
        </Route>
        <Route exact path="/forums">
          <Forums user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
