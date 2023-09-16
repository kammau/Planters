import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import PlantCollection from "./PlantCollection"

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   fetch("/check_session")
  //   .then((res) => res.json())
  //   .then((user) => setUser(user))
  // }, [])


  return (
    <div>
      <main>
        {user ? (
          <div>
            <NavBar user={user} setUser={setUser} />
              <Switch>
                <Route path="/collection">
                  <PlantCollection user={user} />
                </Route>
              </Switch>
          </div>
        ) : (
          <Home setUser={setUser} />
        )}
      </main>
    </div>
  );
}

export default App;
