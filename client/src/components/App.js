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
          <NavBar user={user} setUser={setUser}>
            <Switch>
              <Route path="/">
                <PlantCollection user={user} />
              </Route>
            </Switch>
          </NavBar>
        ) : (
          // <Switch>
          //   <Route path="/login">
          //     <Login setUser={setUser}/>
          //   </Route>
          //   <Route path="/signup">
          //     <Signup setUser={setUser} />
          //   </Route>
          // </Switch>
          <Home setUser={setUser} />
        )}
      </main>
    </div>
  );
}

export default App;
