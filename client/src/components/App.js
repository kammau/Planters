import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "./Login";
import Forums from "./Forums";
import PlantCollection from "./PlantCollection";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/login">
          <Login></Login>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
